import Slider from "./Slider";
import TabSection from "./TabSection/TabSection";
import TourTypeSection from "./TourType/TourTypeSection";
import StorySection from "./TouristStory/StorySection";

const Home = () => {
  return (
    <div>
      {/* slider/banner */}
      <Slider></Slider>
      {/* tourist and travel guide */}
      <TabSection></TabSection>
      <div className="py-20">
        <TourTypeSection></TourTypeSection>
      </div>
      <div>
        <StorySection></StorySection>
      </div>
    </div>
  );
};

export default Home;
