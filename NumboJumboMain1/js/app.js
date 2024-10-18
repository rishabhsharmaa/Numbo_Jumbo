// Import Firestore SDK
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// Initialize Firestore
const db = getFirestore();

// Function to add user data
async function addUser(username, email) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            username: username,
            email: email
        });
        document.getElementById("message").textContent = "User added with ID: " + docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        document.getElementById("message").textContent = "Error adding user.";
    }
}

// Event listener for form submission
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    addUser(username, email);
});
