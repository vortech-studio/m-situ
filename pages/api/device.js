import { db } from "@/lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // const data = req.body;

    // const device_id = data.device_id;

    // if (data.alert) {
    //   const alertsCollectionRef = db
    //     .collection("devices")
    //     .doc(device_id)
    //     .collection("alerts");
    //   alertsCollectionRef.add(data.alert);
    // }

    // const dataCollectionRef = db
    //   .collection("devices")
    //   .doc(device_id)
    //   .collection("data");
    // dataCollectionRef.add(data);

    res.status(200).json({ message: "Data received successfully", data });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
