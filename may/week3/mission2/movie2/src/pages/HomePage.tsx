import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";




const HomePage=():ReactElement=>{
  return (
  <>
    <Navbar />
    <Outlet />
  </>
  );
};
export default HomePage;