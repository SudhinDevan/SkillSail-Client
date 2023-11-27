import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import TutorRoutes from "./Routes/TutorRoutes";
import UserRoutes from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <UserRoutes />
      <TutorRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;
