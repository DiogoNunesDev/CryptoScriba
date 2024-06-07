import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
