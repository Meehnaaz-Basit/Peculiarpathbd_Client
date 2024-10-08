import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OurPackages from "./Tab3Items/OurPackage/OurPackages";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import OurGuideTab from "./Tab3Items/MeetOurGuides/OurGuideTab";
import OverView from "./Tab3Items/Overview/OverView";

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
      <div className="py-16 text-center">
        <h2 className="font-bold font-pacifico text-3xl text-teal-500">
          Tourist and Travel Guide
        </h2>
      </div>
      <div className="max-w-6xl mx-auto">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={handleTabSelect}
          className="border-b-0"
        >
          <TabList className="flex justify-center gap-4 border-b-2 border-teal-500 text-teal-500">
            <Tab>Overview</Tab>
            <Tab>Our Package</Tab>
            <Tab>Meet Our Tour Guides</Tab>
          </TabList>

          <TabPanel>
            <OverView></OverView>
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
