import video from "./../../../../../assets/image/vdo.mp4";

const OverView = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div style={{ position: "relative", maxWidth: "100%", margin: "0 auto" }}>
        <video width="100%" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Explore Bangladesh
        </div>
      </div>
    </div>
  );
};

export default OverView;
