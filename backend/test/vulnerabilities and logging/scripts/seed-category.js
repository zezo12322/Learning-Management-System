#!/usr/bin/env node
/**
 * Seed a test category into the Data Connect emulator database.
 *
 * Usage:
 *   cd backend
 *   node scripts/seed-category.js
 */

const fs = require('fs');

async function seedData() {
  console.log('🔧 Seeding test category and test user via Data Connect REST API...');
  try {
    // 1. Get admin token from Auth Emulator
    const authRes = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'superadmin@test.com',
        password: 'password123',
        returnSecureToken: true
      })
    });
    
    if (!authRes.ok) {
      console.error('Failed to get auth token:', await authRes.text());
      return;
    }
    
    const authData = await authRes.json();
    const adminToken = authData.idToken;

    // 2. Execute GraphQL mutation
    const query = `mutation { 
      user_upsert(data: { id: "test-admin-001", email: "admin1@test.com", name: "Test Admin 1" })
      category_upsert(data: { id: "00000000-0000-0000-0000-000000000001", name: "Security Testing", description: "Category for security test course" })
    }`;

    const res = await fetch('http://127.0.0.1:9399/v1beta/projects/learning-management-syst-3cc3a/locations/europe-west8/services/learning-management-syst-3cc3a-service:executeGraphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ query, operationName: '' })
    });
    
    const result = await res.json();
    if (result.errors && result.errors.length > 0) {
      console.error('❌ Data Connect errors:', JSON.stringify(result.errors, null, 2));
    } else {
      console.log('✅ Successfully seeded category and user via Data Connect!');
      console.log(JSON.stringify(result.data, null, 2));
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    console.error('\nMake sure:');
    console.error(
      '1. Firebase emulators are running: firebase emulators:start',
    );
    console.error('2. Data Connect emulator is enabled in firebase.json');
    process.exit(1);
  }
}

seedData();
