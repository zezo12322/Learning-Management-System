/**
 * Setup Script for Production Firebase
 *
 * Creates test users with proper roles in Firebase Auth (production).
 * Run this BEFORE using the Postman collection with production Firebase.
 *
 * Usage:
 * 1. Update backend/.env with your Firebase project credentials
 * 2. Run: cd backend && node scripts/setup-production-users.js
 * 3. Import and use the Postman collection
 */

console.log('🔧 Starting production user setup...\n');

async function initializeAndSetup() {
  const admin = require('firebase-admin');
  const { getAuth } = require('firebase-admin/auth');

  // Load environment variables
  const fs = require('fs');
  const path = require('path');
  const dotenv = require('dotenv');

  // Parse .env file manually
  const envPath = path.join(__dirname, '..', '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envVars[match[1].trim()] = match[2].trim();
    }
  }

  const projectId = envVars.FIREBASE_PROJECT_ID;
  const serviceAccountPath = envVars.GOOGLE_APPLICATION_CREDENTIALS;

  if (!projectId) {
    console.error('❌ ERROR: FIREBASE_PROJECT_ID not set in .env');
    process.exit(1);
  }

  if (!serviceAccountPath) {
    console.error('❌ ERROR: GOOGLE_APPLICATION_CREDENTIALS not set in .env');
    process.exit(1);
  }

  // Resolve service account path (relative to backend/.env)
  const fullServiceAccountPath = path.join(__dirname, '..', serviceAccountPath);

  if (!fs.existsSync(fullServiceAccountPath)) {
    console.error(`❌ ERROR: Service account file not found at: ${fullServiceAccountPath}`);
    console.error('   Please download it from Firebase Console → Project Settings → Service Accounts');
    process.exit(1);
  }

  const serviceAccount = require(fullServiceAccountPath);

  // Initialize Firebase Admin SDK
  const app = admin.initializeApp({
    credential: admin.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });

  const auth = getAuth(app);

  console.log(`📋 Project: ${projectId}`);
  console.log('⚠️  WARNING: This will create users in PRODUCTION Firebase Auth!\n');

  // Test users to create
  const TEST_USERS = [
    {
      uid: 'test-super-admin-001',
      email: 'superadmin@test.com',
      password: 'password123',
      displayName: 'Test Super Admin',
      claims: { roles: ['super_admin'], companyId: null },
    },
    {
      uid: 'test-admin-001',
      email: 'admin1@test.com',
      password: 'password123',
      displayName: 'Test Admin 1',
      claims: { roles: ['admin'], companyId: null },
    },
    {
      uid: 'test-admin-002',
      email: 'admin2@test.com',
      password: 'password123',
      displayName: 'Test Admin 2',
      claims: { roles: ['admin'], companyId: null },
    },
    {
      uid: 'test-instructor-001',
      email: 'instructor@test.com',
      password: 'password123',
      displayName: 'Test Instructor',
      claims: { roles: ['instructor'], companyId: null },
    },
    {
      uid: 'test-student-001',
      email: 'student1@test.com',
      password: 'password123',
      displayName: 'Test Student 1',
      claims: { roles: ['student'], companyId: null },
    },
    {
      uid: 'test-student-002',
      email: 'student2@test.com',
      password: 'password123',
      displayName: 'Test Student 2',
      claims: { roles: ['student'], companyId: null },
    },
  ];

  console.log('🔧 Setting up test users in production Firebase...\n');

  for (const user of TEST_USERS) {
    let userUid = user.uid;

    // Try to create user (skip if already exists)
    try {
      await auth.createUser({
        uid: user.uid,
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      console.log(`✅ Created user: ${user.email}`);
    } catch (error) {
      if (error.code === 'auth/uid-already-exists' || error.code === 'auth/email-already-exists') {
        console.log(
          `⚠️  User already exists: ${user.email} (using existing user)`,
        );
        userUid = user.uid;
      } else {
        console.error(`❌ Error creating ${user.email}:`, error.message);
        continue;
      }
    }

    // Set custom claims (roles) - this works even for existing users
    try {
      await auth.setCustomUserClaims(userUid, user.claims);
      console.log(`   ✅ Set role: ${user.claims.roles.join(', ')}\n`);
    } catch (error) {
      console.error(
        `   ❌ Error setting role for ${user.email}:`,
        error.message,
      );
    }
  }

  console.log('\n✅ User setup complete!\n');
  console.log('📋 Test Credentials:');
  console.log('   Super Admin: superadmin@test.com / password123');
  console.log('   Admin 1:     admin1@test.com / password123');
  console.log('   Admin 2:     admin2@test.com / password123');
  console.log('   Instructor:  instructor@test.com / password123');
  console.log('   Student 1:   student1@test.com / password123');
  console.log('   Student 2:   student2@test.com / password123');
  console.log('\n🚀 You can now use the Postman collection!\n');

  process.exit(0);
}

initializeAndSetup().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});