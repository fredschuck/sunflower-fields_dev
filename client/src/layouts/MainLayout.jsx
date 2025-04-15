// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";

function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="top-0 left-0 right-0 z-100 fixed">
        <NavBar />
      </div>
      <main className="w-full">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
