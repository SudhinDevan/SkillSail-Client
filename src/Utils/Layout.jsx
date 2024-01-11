import { Outlet } from "react-router-dom";

function Layouts() {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default Layouts;
