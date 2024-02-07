import { collection, doc, getDoc, getDocs } from "firebase/firestore";
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

export async function getAlerts() {
  const devicesCollectionRef = collection(db, "devices");

  try {
    const devicesSnapshot = await getDocs(devicesCollectionRef);

    const alerts = [];
    const devices = [];

    const promises = devicesSnapshot.docs.map(async (deviceDoc) => {
      const alertsCollectionRef = collection(deviceDoc.ref, "alerts");
      const alertsSnapshot = await getDocs(alertsCollectionRef);

      alertsSnapshot.forEach((alertDoc) => {
        const alertData = alertDoc.data();
        alerts.push(alertData);
      });
    });

    await Promise.all(promises);

    return { alerts, devices };
  } catch (error) {
    console.error("Failed to get alerts:", error);
    throw new Error("Failed to get alerts");
  }
}
