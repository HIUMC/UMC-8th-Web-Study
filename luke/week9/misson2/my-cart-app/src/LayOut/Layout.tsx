import { Outlet } from "react-router-dom";
import ConfirmationModal from "../features/modal/ConfirmationModal";

export default function Layout() {
  return (
    <>
        <ConfirmationModal />
        <Outlet />
    </>
  );
}