import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    console.log("Received data:", data);

    const data = req.body;

    const device_id = data.device_id;

    if (data.alert) {
      const alertsCollectionRef = doc(db, "devices", device_id, "alerts");
      await setDoc(alertsCollectionRef, data.alert);
    }

    if (data.routine) {
      const dataCollectionRef = doc(db, "devices", device_id, "routine");
      await setDoc(dataCollectionRef, data.routine);
    }

    res.status(200).json({ message: "Data received successfully", data });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
