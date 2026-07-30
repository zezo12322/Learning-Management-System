/**
 * Quick Setup Script for Postman Testing
 *
 * This script creates test users with proper roles in Firebase Auth Emulator.
 * Run this BEFORE using the Postman collection.
 *
 * Usage:
 * 1. Start Firebase Emulator: firebase emulators:start
 * 2. Run this script: cd backend && node scripts/setup-postman-users.js
 * 3. Import and use the Postman collection
 */

console.log('🔧 Starting user setup...\n');

// Check if Firebase emulator is running
const http = require('http');
const options = {
  hostname: '127.0.0.1',
  port: 9099,
  path: '/',
  method: 'GET',
  timeout: 2000,
};

const req = http.request(options, (res) => {
  console.log('✅ Firebase Auth Emulator is running\n');
  initializeAndSetup();
});

req.on('error', (error) => {
  console.error('❌ ERROR: Firebase Auth Emulator is NOT running!\n');
  console.error('Please start it first:');
  console.error('  firebase emulators:start\n');
  console.error('Then run this script again from the backend directory:\n');
  console.error('  cd backend');
  console.error('  node scripts/setup-postman-users.js\n');
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy();
  console.error('❌ ERROR: Firebase Auth Emulator connection timeout!\n');
  process.exit(1);
});

req.end();

async function initializeAndSetup() {
  const admin = require('firebase-admin');
  const { getAuth } = require('firebase-admin/auth');

  // Initialize Firebase Admin SDK for emulator
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

  const serviceAccount = require('../../firebase-service-account.json');

  // Use a named app to avoid conflicts with existing default app
  const APP_NAME = 'setup-script';
  let app;
  const existingApps = admin.getApps();
  if (existingApps.some((a) => a.name === APP_NAME)) {
    app = admin.getApp(APP_NAME);
  } else {
    app = admin.initializeApp(
      {
        credential: admin.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      },
      APP_NAME,
    );
  }

  // The emulator is automatically used when FIREBASE_AUTH_EMULATOR_HOST is set
  const auth = getAuth(app);

  // Test users to create
  const TEST_USERS = [
    {
      uid: 'test-student-001',
      email: 'student1@test.com',
      password: 'password123',
      displayName: 'Test Student 1 (Enrolled)',
      claims: { roles: ['student'], companyId: null },
    },
    {
      uid: 'test-student-002',
      email: 'student1@test.com',
      password: 'password123',
      displayName: 'Test Student 2 (Not Enrolled)',
      claims: { roles: ['student'], companyId: null },
    },
    {
      uid: 'test-instructor-001',
      email: 'instructor@test.com',
      password: 'password123',
      displayName: 'Test Instructor',
      claims: { roles: ['instructor'], companyId: null },
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
      uid: 'test-super-admin-001',
      email: 'superadmin@test.com',
      password: 'password123',
      displayName: 'Test super_admin',
      claims: { roles: ['super_admin'], companyId: null },
    },
  ];

  console.log('🔧 Setting up test users for Postman...\n');

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
      if (error.code === 'auth/uid-exists' || error.code === 'auth/email-already-exists' || error.message.includes('already exists') || error.message.includes('already in use')) {
        console.log(
          `⚠️  User already exists: ${user.email} (using existing user)`,
        );
        userUid = user.uid; // Use the existing UID
      } else {
        console.error(`❌ Error creating ${user.email}:`, error.message);
        continue; // Skip to next user
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
  console.log('   Student 1: student1@test.com / password123');
  console.log('   Student 2: student2@test.com / password123');
  console.log('   Instructor: instructor@test.com / password123');
  console.log('   Admin 1: admin1@test.com / password123');
  console.log('   Admin 2: admin2@test.com / password123');
  console.log('   SuperAdmin: superadmin@test.com / password123');
  console.log('\n🚀 You can now use the Postman collection!\n');

  process.exit(0);
}

initializeAndSetup().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
