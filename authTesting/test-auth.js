const admin = require("firebase-admin");

// Initialize Admin SDK (Make sure your service account key path is correct!)
const serviceAccount = require("./learning-management-syst-3cc3a-firebase-adminsdk-fbsvc-c8e63b4d9f.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

/**
 * Actively polls Firebase Auth until the custom claims appear.
 * @param {string} uid - The user ID to check.
 * @param {number} maxAttempts - How many times to try before giving up.
 * @param {number} delayMs - Milliseconds to wait between attempts.
 */
async function waitForClaims(uid, maxAttempts = 15, delayMs = 1000) {
    console.log(`\n⏳ Polling Firebase Auth for claims (UID: ${uid})...`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const userRecord = await admin.auth().getUser(uid);

        // Check if the custom claims object exists and has our 'roles' array
        if (userRecord.customClaims && userRecord.customClaims.roles) {
            console.log(`✅ Claims successfully detected on attempt ${attempt}!`);
            return userRecord.customClaims;
        }

        console.log(`🔄 Attempt ${attempt}/${maxAttempts}: Claims not ready yet. Retrying in ${delayMs / 1000}s...`);

        // Wait before the next loop iteration
        await new Promise(resolve => setTimeout(resolve, delayMs));
    }

    throw new Error(`❌ Timeout: Claims were not attached after ${maxAttempts} attempts.`);
}

async function runTest() {
    // Generate a random mock ID to ensure a fresh test every time
    const mockId = `mock-user-${Date.now()}`;
    const mockEmail = `${mockId}@example.com`;

    try {
        console.log(`\n🧑‍💻 Creating new test user: ${mockEmail}`);
        const newUser = await admin.auth().createUser({
            uid: mockId,
            email: mockEmail,
            password: "password123",
        });

        console.log(`✅ User created instantly: ${newUser.uid}`);

        // Wait dynamically instead of a hardcoded timeout
        const claims = await waitForClaims(newUser.uid);

        console.log("\n====================================");
        console.log("FINAL RESULT - Custom Claims:");
        console.log(claims);
        console.log("====================================\n");

    } catch (error) {
        console.error("\n❌ Test Failed:", error);
    } finally {
        // Optional: Clean up the mock user so your Auth dashboard doesn't get cluttered
        // await admin.auth().deleteUser(mockId);
        process.exit();
    }
}

runTest();