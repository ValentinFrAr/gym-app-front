import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import injectContext from "./store/AppContext";
import Register from "./views/Register";
import UsersTable from "./components/UsersTable";
import UpdateUserData from "./components/UpdateUserData";
import NotFound from "./views/NotFound";
import CreateRecipeForm from "./components/CreateRecipeForm";
import AllRecipes from "./components/AllRecipes";
import EditRecipeData from "./components/EditRecipeData";
import Navbar from "./components/Navbar";
import UserSettings from "./views/UserSettings";

function App() {
  const basename = process.env.BASENAME || "";

  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/recipe" element={<CreateRecipeForm />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/edit-user/:id" element={<UpdateUserData />} />
        <Route path="/edit-recipe/:id" element={<EditRecipeData />} />
        <Route path="/user" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default injectContext(App);
