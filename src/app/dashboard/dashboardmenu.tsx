"use client";

import { useRouter } from "next/navigation";
import { FaTruck, FaList, FaRoute, FaUser } from "react-icons/fa";
import "../dashboard/dashboardmenu.css";
import Link from "next/link";

export default function DashboardMenu() {

    let s = 30;
  const menuItems = [
    { name: "Vehicle", path: "/vehicle/list", icon: <FaTruck size={s} /> },
    { name: "Vehicle Type", path: "/vehicleType/list", icon: <FaList size={40} /> },
    { name: "Transport", path: "/transport/list", icon: <FaRoute size={40} /> },
    { name: "Driver", path: "/driver/list", icon: <FaUser size={40} /> },
    { name: "Party", path: "/vehicle/list", icon: <FaTruck size={40} /> },
    { name: "Location", path: "/transport/list", icon: <FaRoute size={40} /> },
  ];

  return (
    <>
    <h1>AdhiSree Transport Service</h1>
    <div className="dashboard-wrapper">
    <div className="dashboard-container">
      {menuItems.map((item) => (
        <Link href={item.path} className="dashboard-card">
        {item.name}
        </Link>
      ))}
    </div>
    </div></>
  );
}
