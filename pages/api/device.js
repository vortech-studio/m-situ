import { db } from "@/lib/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const data = req.body;

    const device_id = data.device_id;

    const currentTimestamp = Timestamp.now();

    const alertsCollectionRef = doc(
      db,
      "devices",
      device_id,
      "alerts",
      currentTimestamp.toString()
    );
    await setDoc(alertsCollectionRef, data.alert);

    const dataCollectionRef = doc(
      db,
      "devices",
      device_id,
      "data",
      currentTimestamp.toString()
    );
    await setDoc(dataCollectionRef, data.routine);

    res.status(200).json({ message: "Data received successfully", data });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
