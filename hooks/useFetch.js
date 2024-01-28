import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { doc, getDoc } from "firebase/firestore";

const useFetch = ({ id, path, dependencies = [], paused = false }) => {
  const [data, setData] = useState(null);
  const { showBoundary } = useErrorBoundary();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paused) {
      setLoading(true);

      if (id) {
        const docRef = doc(db, path, id);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setLoading(false);
              setData(docSnap.data());
            } else {
              throw "Entity does not exist";
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
            showBoundary(error);
          });
      }
    }
  }, [dependencies]);

  return { data, loading };
};

export default useFetch;

export async function getDeviceByID(id) {
  const docRef = doc(db, "devices", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw "Device does not exist";
  }
}
