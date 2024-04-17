import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import injectContext from "./store/AppContext";

function App() {
  const basename = process.env.BASENAME || "";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);
