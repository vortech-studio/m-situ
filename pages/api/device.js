import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  try {
    const data = req.body;

    // Add a timestamp field to the data object
    const timestamp = new Date();

    console.log(data);

    const device_id = data.device_id;

    if (data.alerts) {
      const alertId = uuidv4();
      const alertsCollectionRef = doc(
        db,
        "devices",
        device_id,
        "alerts",
        alertId
      );
      await setDoc(alertsCollectionRef, { ...data.alerts, timestamp });
    }

    if (data.routine) {
      const routineId = uuidv4();
      const dataCollectionRef = doc(
        db,
        "devices",
        device_id,
        "routine",
        routineId
      );
      await setDoc(dataCollectionRef, { ...data.routine, timestamp });
    }

    res.status(200).json({ message: "Data received successfully", data });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
