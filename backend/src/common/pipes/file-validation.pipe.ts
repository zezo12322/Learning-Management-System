import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  ALLOWED_TEMPLATE_EXTENSIONS,
  ALLOWED_TEMPLATE_MIME_TYPES,
  FILE_SIZE_LIMITS,
} from '../constants/storage-paths';

interface FileValidationOptions {
  allowedMimeTypes?: string[];
  maxSize?: number;
}

/**
 * Pipe that validates uploaded files against MIME type and file size constraints.
 * Used specifically for mission template uploads (.pdf, .docx, .xlsx).
 */
@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes: string[];
  private readonly maxSize: number;

  constructor(options?: FileValidationOptions) {
    this.allowedMimeTypes =
      options?.allowedMimeTypes ?? Object.keys(ALLOWED_TEMPLATE_MIME_TYPES);
    this.maxSize = options?.maxSize ?? FILE_SIZE_LIMITS.TEMPLATE;
  }

  async transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate MIME type
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    // Validate file extension
    const ext = this.getExtension(file.originalname);
    if (!ALLOWED_TEMPLATE_EXTENSIONS.includes(ext)) {
      throw new BadRequestException(
        `Invalid file extension: ${ext}. Allowed: ${ALLOWED_TEMPLATE_EXTENSIONS.join(', ')}`,
      );
    }

    // Validate MIME type matches extension
    const expectedExt = ALLOWED_TEMPLATE_MIME_TYPES[file.mimetype];
    if (expectedExt && expectedExt !== ext) {
      throw new BadRequestException(
        `File extension ${ext} does not match MIME type ${file.mimetype} (expected ${expectedExt})`,
      );
    }

    // Validate magic bytes (header signature) to prevent spoofed extensions.
    // .docx/.xlsx are ZIP-based, so file-type reports them as application/zip.
    if (file.buffer) {
      // file-type is ESM-only (v22). With tsconfig module=nodenext this dynamic
      // import stays a native import() and loads correctly from our CJS build.
      const { fileTypeFromBuffer } = await import('file-type');
      const detected = await fileTypeFromBuffer(file.buffer);
      if (!detected) {
        throw new BadRequestException(
          'Could not determine the true file type from its contents',
        );
      }
      const ZIP_BASED = new Set(['.docx', '.xlsx']);
      const signatureOk =
        detected.mime === file.mimetype ||
        (ZIP_BASED.has(ext) && detected.mime === 'application/zip');
      if (!signatureOk) {
        throw new BadRequestException(
          `File contents (${detected.mime}) do not match the declared type (${file.mimetype})`,
        );
      }
    }

    // Validate file size
    if (file.size > this.maxSize) {
      const maxMB = (this.maxSize / (1024 * 1024)).toFixed(0);
      throw new BadRequestException(
        `File too large: ${(file.size / (1024 * 1024)).toFixed(1)}MB. Maximum: ${maxMB}MB`,
      );
    }

    return file;
  }

  private getExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1) return '';
    return filename.substring(lastDot).toLowerCase();
  }
}
