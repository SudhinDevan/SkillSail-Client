import "./App.css";
import AdminRoutes from "./Routes/AdminRoutes";
import AuthRoutes from "./Routes/UserRoutes";

function App() {
  return (
    <>
      <AuthRoutes />
      <AdminRoutes />
    </>
  );
}

export default App;
