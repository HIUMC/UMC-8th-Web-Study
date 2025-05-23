import "./App.css";
import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import { Provider } from "react-redux";
import store from "./store/store";
import PriceBox from "./components/PriceBox";

function App() {
  //void값이라는 것은 return값을 제대로 설정하지 않았다는 것과 동일한의미임.
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>
  );
}

export default App;
