import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingBar from "../../components/animations/loadingBar";
import { LineChart } from "../../components/charts/lineChart";
import Sidebar from "../../components/layouts/sideBar";
import Breadcrumbs from "../../components/navigation/breadcrumbs";
import { Card } from "../../components/statistics/card";
import { getDeviceByID, getDeviceRoutineByID } from "../../services/devices";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState();
  const [routine, setRoutine] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDeviceByID(id)
      .then((data) => {
        setData(data);
      })
      .then(() =>
        getDeviceRoutineByID(id).then((data) => {
          setRoutine(data);
          console.log(data);
        })
      )
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingBar />
  ) : (
    <div className="space-y-8 p-8">
      <Breadcrumbs
        pages={[
          { name: "Devices", href: "/devices" },
          {
            name: data.id,
            href: `/devices/${data.id}`,
          },
        ]}
      />
      {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
        {[
          { label: "Temperature", value: "24°C" },
          { label: "Humidity", value: "44%" },
        ].map((data, i) => (
          <Card key={i} data={data} />
        ))}
      </div> */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border-[0.5px] bg-white p-4 shadow">
          <LineChart title={"Temperature"} />
        </div>
        {/* <div className="rounded-lg border-[0.5px] bg-white p-4 shadow">
          <LineChart title={"Humidity"} />
        </div> */}
      </div>
    </div>
  );
}

Page.layout = Sidebar;
Page.auth = true;
