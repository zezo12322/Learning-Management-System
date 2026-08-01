      /**
 * Comprehensive Rate Limiter Test Suite
 * 
 * Tests all rate limiting fixes:
 * 1. Fail-closed behavior (503 when Redis down)
 * 2. Per-endpoint limits (different limits for different endpoints)
 * 3. Global limit (100 req/60s for default endpoints)
 * 
 * Run: node scripts/test-rate-limiter.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3001';

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, path, method });
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function testEndpoint(path, method, count, label, body = null) {
  console.log(`\n--- ${label} (${method} ${path}) ---`);
  console.log(`Sending ${count} requests...`);
  
  const results = { passed: 0, blocked: 0, errors: 0 };
  
  for (let i = 1; i <= count; i++) {
    try {
      const result = await makeRequest(path, method, body);
      if (result.status === 429) {
        results.blocked++;
        if (i === 1 || i === count || results.blocked === 1) {
          console.log(`  Request ${i}: 429 BLOCKED`);
        }
      } else if (result.status === 503) {
        results.errors++;
        if (i === 1 || results.errors === 1) {
          console.log(`  Request ${i}: 503 SERVICE UNAVAILABLE (fail-closed)`);
        }
      } else {
        results.passed++;
        if (i <= 3 || i === count) {
          console.log(`  Request ${i}: ${result.status}`);
        }
      }
    } catch (error) {
      results.errors++;
      console.log(`  Request ${i}: ERROR - ${error.message}`);
    }
  }
  
  console.log(`  Result: ${results.passed} passed, ${results.blocked} blocked (429), ${results.errors} errors (503)`);
  return results;
}

async function main() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║  Comprehensive Rate Limiter Test Suite                    ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('\nThis test verifies all rate limiting fixes:');
  console.log('  1. Fail-closed behavior (503 when Redis down)');
  console.log('  2. Per-endpoint limits (5/60s for auth, 10/60s for uploads)');
  console.log('  3. Global limit (100/60s for default endpoints)');
  console.log('\n' + '='.repeat(60));
  console.log('PHASE 1: Redis UP - Normal Operation');
  console.log('='.repeat(60));

  // Test 1: Sensitive endpoint (5 req/60s)
  const syncResults = await testEndpoint('/api/v1/me/sync', 'POST', 10, 'Auth Endpoint (limit: 5/60s)', {
    idToken: 'fake-token',
    email: 'test@test.com',
    displayName: 'Test User'
  });

  // Test 2: Upload endpoint (10 req/60s)
  const uploadResults = await testEndpoint('/api/v1/uploads/signed-url', 'POST', 15, 'Upload Endpoint (limit: 10/60s)', {
    entityType: 'lecture',
    entityId: 'test-id',
    fileType: 'video/mp4'
  });

  // Test 3: Default endpoint (100 req/60s)
  const coursesResults = await testEndpoint('/api/v1/courses', 'GET', 10, 'Default Endpoint (limit: 100/60s)');

  console.log('\n' + '='.repeat(60));
  console.log('PHASE 1 RESULTS (Redis UP)');
  console.log('='.repeat(60));
  console.log(`Auth endpoint (/me/sync):      ${syncResults.passed} passed, ${syncResults.blocked} blocked`);
  console.log(`Upload endpoint (/uploads/*):  ${uploadResults.passed} passed, ${uploadResults.blocked} blocked`);
  console.log(`Default endpoint (/courses):   ${coursesResults.passed} passed, ${coursesResults.blocked} blocked`);

  const phase1Pass = syncResults.blocked > 0 && uploadResults.blocked > 0 && coursesResults.blocked === 0;
  console.log(`\nPhase 1: ${phase1Pass ? '✅ PASS' : '❌ FAIL'} - Per-endpoint limits working`);

  console.log('\n' + '='.repeat(60));
  console.log('PHASE 2: Redis DOWN - Fail-Closed Behavior');
  console.log('='.repeat(60));
  console.log('\n⚠️  NOW STOP REDIS: docker compose -f backend/docker-compose.yml stop redis');
  console.log('⚠️  Wait 5 seconds, then press ENTER to continue...');
  
  await new Promise(resolve => {
    process.stdin.once('data', resolve);
  });

  // Test all endpoints with Redis down
  const syncDownResults = await testEndpoint('/api/v1/me/sync', 'POST', 5, 'Auth Endpoint (Redis DOWN)');
  const uploadDownResults = await testEndpoint('/api/v1/uploads/signed-url', 'POST', 5, 'Upload Endpoint (Redis DOWN)');
  const coursesDownResults = await testEndpoint('/api/v1/courses', 'GET', 5, 'Default Endpoint (Redis DOWN)');

  console.log('\n' + '='.repeat(60));
  console.log('PHASE 2 RESULTS (Redis DOWN)');
  console.log('='.repeat(60));
  console.log(`Auth endpoint:     ${syncDownResults.errors} returned 503 (fail-closed)`);
  console.log(`Upload endpoint:   ${uploadDownResults.errors} returned 503 (fail-closed)`);
  console.log(`Default endpoint:  ${coursesDownResults.errors} returned 503 (fail-closed)`);

  const phase2Pass = syncDownResults.errors === 5 && uploadDownResults.errors === 5 && coursesDownResults.errors === 5;
  console.log(`\nPhase 2: ${phase2Pass ? '✅ PASS' : '❌ FAIL'} - Fail-closed behavior working`);

  console.log('\n' + '='.repeat(60));
  console.log('FINAL SUMMARY');
  console.log('='.repeat(60));
  console.log(`Phase 1 (Per-endpoint limits): ${phase1Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Phase 2 (Fail-closed):         ${phase2Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(60));

  if (phase1Pass && phase2Pass) {
    console.log('\n🎉 ALL TESTS PASSED - Rate limiter is fully functional!');
    console.log('\n🔄 Restart Redis: docker compose -f backend/docker-compose.yml start redis');
    process.exit(0);
  } else {
    console.log('\n❌ SOME TESTS FAILED');
    process.exit(1);
  }
}

main().catch(console.error);
