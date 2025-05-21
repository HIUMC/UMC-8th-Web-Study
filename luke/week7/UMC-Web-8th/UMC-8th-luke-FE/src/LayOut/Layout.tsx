import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-between bg-gray-950 text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-sm text-gray-400">
        ⓒ 2025 LukePage. All rights reserved.
      </footer>
    </div>
  );
}