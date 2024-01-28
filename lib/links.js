import { HiLocationMarker } from "react-icons/hi";
import { BsFillDeviceSsdFill } from "react-icons/bs";

export const navigationLinks = [
  {
    name: "Map",
    resource: "",
    type: "",
    icon: HiLocationMarker,
    current: true,
    href: "/dashboard",
  },
  {
    name: "Devices",
    resource: "",
    type: "",
    icon: BsFillDeviceSsdFill,
    current: false,
    href: "/devices",
  },
];
