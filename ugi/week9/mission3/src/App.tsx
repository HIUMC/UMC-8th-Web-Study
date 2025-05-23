import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import PriceBox from "./components/PriceBox";
import ClearCartModal from "./components/ClearCartModal";
import { useCartActions } from "./hooks/useCartStore";

function App() {
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals(); // 앱 로드 시 한 번 실행
  }, [calculateTotals]);

  return (
    <>
      <Navbar />
      <CartList />
      <PriceBox />
      <ClearCartModal />
    </>
  );
}

export default App;
