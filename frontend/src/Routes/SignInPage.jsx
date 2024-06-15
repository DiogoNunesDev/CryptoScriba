import Login from "../components/Login";
import logo from '../assets/CryptoScriba_.png';
function SignInPage() {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#0F172A", // Dark blue background
      position: "relative",
      overflow: "hidden",
    },
    text: {
      fontSize: "5rem",
      maxWidth: 500,
      fontFamily: "verdana",
      fontWeight: "bold",
      color: "#fff", // White text color

    },
    heading: {
      position: "absolute",
      top: "4rem",
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#fff", // White text color
    },
    circle: {
      position: "absolute",
      left: "-40%",
      bottom: "-25%",
      width: "70%",
      height: "100%",
      borderRadius: 1000,
      backgroundColor: "#1E293B", // Slightly lighter dark blue circle
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop:'-10%'
      
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.circle}>
        <div style={styles.text}>Welcome back!</div>
      </div>
      <img style={styles.heading} src={logo} alt="Logo" />

    <Login/>
    </div>
  );
}

export default SignInPage;
