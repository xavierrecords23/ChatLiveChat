// Firebase imports (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyCHbIx2d4UBVFiTLfeEM8Gyiw18vfwbncU",
  authDomain: "chatchat-c55c2.firebaseapp.com",
  projectId: "chatchat-c55c2",
  storageBucket: "chatchat-c55c2.firebasestorage.app",
  messagingSenderId: "873767901477",
  appId: "1:873767901477:web:a9d4d0caf02f4d63b922cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase connected!");

// 🔹 SAVE DATA
window.saveData = async function () {
  const message = document.getElementById('Themessageinput').value;
  if(message.trim() === "") return;

  await addDoc(collection(db, "Messages"), {
    NewestMessage: message,
    time: new Date()
  });

  document.getElementById('Themessageinput').value = '';
  alert("Saved!");
};

// 🔹 LOAD DATA (optional test)
async function loadData() {
  const querySnapshot = await getDocs(collection(db, "Messages")); // changed from "scores"
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

// 🔹 Display most recent message
async function getLatestMessage() {
  const messagesRef = collection(db, "Messages");

  const q = query(messagesRef, orderBy("time", "desc"), limit(1));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const latestMessage = doc.data().NewestMessage;
    console.log("Latest message:", latestMessage);
    document.getElementById('Mostrecentmessagedisplay').textContent = latestMessage;
  });
}

// 🔹 Auto-update every second
setInterval(getLatestMessage, 300);

// Optional initial load
loadData();