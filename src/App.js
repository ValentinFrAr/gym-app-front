import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import injectContext from "./store/AppContext";
import Register from "./views/Register";
import UsersTable from "./components/UsersTable";
import NewProgram from "./components/NewProgram";
import AllPrograms from "./views/AllPrograms";
import ViewProgram from "./views/ViewProgram";

function App() {
  const basename = process.env.BASENAME || "";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/new-program" element={<NewProgram />} />
        <Route path="/get-all-programs" element={<AllPrograms/>}/>
        <Route path="/view-program/:id" element={<ViewProgram/>}/>
      </Routes> 
    </BrowserRouter>
  );
}

export default injectContext(App);
