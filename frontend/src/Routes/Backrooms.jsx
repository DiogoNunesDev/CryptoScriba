function Backrooms() {
  return (
    <>
      <div>Backrooms</div>
      <button onClick={()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("is_staff");
        window.location.href = "/";
      }}>logout</button>
    </>
  );
}

export default Backrooms;
