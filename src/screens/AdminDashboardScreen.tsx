"use client";

import {
  HeaderComponent,
  RecordsComponent,
} from "@/src/components/inpage/AdminSection";
import { useAppSelector } from "../hooks/useStore";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminDashboardScreen() {
  //--hooks
  const router = useRouter();
  const { isLogged } = useAppSelector((state) => state.admin);

  //--states
  const [loading, setLoading] = React.useState(true);

  //--effects
  React.useEffect(() => {
    function loadDashboard() {
      if (isLogged) {
        setLoading(false);
      } else {
        router.replace("/admin");
      }
    }

    loadDashboard();
  }, [isLogged]);

  if (loading) {
    return (
      <div className="w-full h-screen centralize">
        <div className="w-12 h-12 rounded-full border border-pri-bg border-b-0 border-r-0 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sec-bg flex flex-col">
      <HeaderComponent />

      <RecordsComponent />
    </div>
  );
}
