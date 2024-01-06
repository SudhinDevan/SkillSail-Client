import { Route, Router } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import TutorRoutes from "./Routes/TutorRoutes";
import UserRoutes from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <Router>
        <Route path="/*" element={<UserRoutes />}>
        </Route>

        <TutorRoutes />
        <AdminRoutes />
      </Router>
    </>
  );
}

export default App;
