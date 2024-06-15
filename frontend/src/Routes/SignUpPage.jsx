import Register from "../components/Register";
import logo from "../assets/CryptoScriba_.png";

function SignUpPage() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-40%",
          bottom: "-25%",
          width: "70%",
          height: "100%",
          borderRadius: 1000,
          backgroundColor: "#273744", // Slightly lighter dark blue circle
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "-10%",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#142636",
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: 500, marginTop: 100, marginBottom: 100 }}
          src={logo}
          alt="Logo"
        />
        <Register />
      </div>
    </>
  );
}

export default SignUpPage;
