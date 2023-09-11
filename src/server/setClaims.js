import admin from "firebase-admin";
import ServiceAccount from ".././serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});


const auth = admin.auth();

async function setLibrarianRole(uid) {
  try {
    await auth.setCustomUserClaims(uid, { role: "librarian" });
    console.log("Librarian role set successfully");
  } catch (error) {
    console.log("Error setting librarian role:", error);
  }
}

export default setLibrarianRole
