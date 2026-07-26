import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { cert } from 'firebase-admin/app';
import { FirebaseService } from './firebase.service';

// Mock the firebase-admin subpath modules so the real (ESM-only) transitive
// dependencies are never loaded during unit tests.
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(() => ({})),
  cert: jest.fn(() => ({})),
}));
jest.mock('firebase-admin/auth', () => ({ getAuth: jest.fn(() => ({})) }));
jest.mock('firebase-admin/storage', () => ({
  getStorage: jest.fn(() => ({})),
}));

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string, def?: any) =>
              key === 'GOOGLE_APPLICATION_CREDENTIALS'
                ? 'firebase-service-account.json'
                : (def ?? ''),
          },
        },
      ],
    }).compile();

    service = module.get<FirebaseService>(FirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('initializes the firebase app on module init', () => {
    expect(() => service.onModuleInit()).not.toThrow();
    expect(cert).toHaveBeenCalledWith('firebase-service-account.json');
  });

  it('initializes from a base64-encoded service account in hosted environments', async () => {
    const serviceAccount = {
      project_id: 'learning-management-syst-3cc3a',
      client_email: 'firebase-admin@example.test',
      private_key: 'test-key',
    };
    const encodedServiceAccount = Buffer.from(
      JSON.stringify(serviceAccount),
    ).toString('base64');
    const module = await Test.createTestingModule({
      providers: [
        FirebaseService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string, def?: any) =>
              key === 'FIREBASE_SERVICE_ACCOUNT_BASE64'
                ? encodedServiceAccount
                : (def ?? ''),
          },
        },
      ],
    }).compile();

    expect(() => module.get(FirebaseService).onModuleInit()).not.toThrow();
    expect(cert).toHaveBeenCalledWith(serviceAccount);
  });
});
