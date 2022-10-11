import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";

const addPhonebook = async ({ userId, name, number }) => {
try {
await addDoc(collection(db, "phonebook"), {
user: userId,
name: name,
number: number,
createdAt: new Date().getTime(),
});
} catch (err) {}
};

const deletePhonebook = async (docId) => {
try {
const PhonebookRef = doc(db, "phonebook", docId);
await deleteDoc(PhonebookRef);
} catch (err) {
console.log(err);
}
};
export { addPhonebook, deletePhonebook };