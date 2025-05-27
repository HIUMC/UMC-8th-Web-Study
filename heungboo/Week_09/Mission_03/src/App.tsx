import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <CartList />
        <PriceBox />
      </Router>
    </Provider>
  );
}

export default App;
