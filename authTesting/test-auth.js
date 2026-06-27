var admin = require("firebase-admin");

var serviceAccount = require("./learning-management-syst-3cc3a-firebase-adminsdk-fbsvc-c8e63b4d9f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// A simple helper function to pause the script
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function createTestUser() {
    try {
        // 1. Trigger the Cloud Function by creating the user
        console.log("Creating user...");
        const userRecord = await admin.auth().createUser({
            email: "backendtest2@example.com", // Changed slightly so it doesn't duplicate
            password: "SuperSecurePassword123",
            uid: "00000000-0000-0000-0000-000000000001"
        });

        console.log(`Successfully created new user: ${userRecord.uid}`);
        console.log("Waiting 3 seconds for the Cloud Function to finish mapping claims...");

        // 2. Pause to give the Cloud Function time to execute
        await sleep(3000);

        // 3. THE VERIFICATION: Fetch the user again to prove the claims exist
        const updatedUser = await admin.auth().getUser(userRecord.uid);

        console.log("====================================");
        console.log("FINAL RESULT - Custom Claims:");
        console.log(updatedUser.customClaims);
        console.log("====================================");

    } catch (error) {
        console.error("Error testing auth pipeline:", error);
    }
}

createTestUser();
