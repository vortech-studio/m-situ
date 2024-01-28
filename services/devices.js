import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function getDeviceByID(id) {
  const docRef = doc(db, "devices", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw "Device does not exist";
  }
}
