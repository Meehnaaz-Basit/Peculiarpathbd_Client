import TabSection from "./TabSection/TabSection";
import TourTypeSection from "./TourType/TourTypeSection";

const Home = () => {
  return (
    <div>
      <h2>this is home</h2>
      {/* slider/banner */}
      {/* tourist and travel guide */}
      <TabSection></TabSection>
      <div className="py-20">
        <TourTypeSection></TourTypeSection>
      </div>
    </div>
  );
};

export default Home;
