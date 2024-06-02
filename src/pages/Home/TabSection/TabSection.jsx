import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OurPackages from "./Tab3Items/OurPackage/OurPackages";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OurGuideTab from "./Tab3Items/MeetOurGuides/OurGuideTab";
const TabSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabIndexFromLocation = () => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") ? parseInt(params.get("tab")) : 0;
  };

  const [tabIndex, setTabIndex] = useState(getTabIndexFromLocation());

  useEffect(() => {
    setTabIndex(getTabIndexFromLocation());
  }, [location]);

  const handleTabSelect = (index) => {
    navigate(`?tab=${index}`);
    setTabIndex(index);
  };
  return (
    <div>
      <div>
        <h2>Tourist and travel guide</h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={handleTabSelect}
          className="border-b-0"
        >
          <TabList className="flex justify-center gap-4 border-b-2">
            <Tab>Overview</Tab>
            <Tab>Our Package</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>

          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <OurPackages></OurPackages>
          </TabPanel>
          <TabPanel>
            <OurGuideTab></OurGuideTab>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TabSection;
