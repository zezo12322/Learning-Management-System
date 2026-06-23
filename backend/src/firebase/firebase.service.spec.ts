import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

// Mock the firebase-admin subpath modules so the real (ESM-only) transitive
// dependencies are never loaded during unit tests.
jest.mock('firebase-admin/app', () => ({
  initializeApp: jest.fn(() => ({})),
  cert: jest.fn(() => ({})),
}));
jest.mock('firebase-admin/auth', () => ({ getAuth: jest.fn(() => ({})) }));
jest.mock('firebase-admin/firestore', () => ({ getFirestore: jest.fn(() => ({})) }));
jest.mock('firebase-admin/storage', () => ({ getStorage: jest.fn(() => ({})) }));

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        {
          provide: ConfigService,
          useValue: { get: (_key: string, def?: any) => def ?? '' },
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
  });
});
