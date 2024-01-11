import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import TutorRoutes from "./Routes/TutorRoutes";
import UserRoutes from "./Routes/UserRoutes";
import Layouts from "./Utils/Layout";
import Error from "./Pages/Error/Error";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/" element={<Home />} exact />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/tutor/*" element={<TutorRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
