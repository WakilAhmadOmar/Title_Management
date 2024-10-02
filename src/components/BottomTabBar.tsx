import { Message, Setting2, Wallet1 } from "iconsax-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BottomTabBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Wallet");

  const tabs = [{ name: "Wallet" }, { name: "Message" }, { name: "Setting" }];

  const handleChangeRoute = (event: React.MouseEvent) => {
    const id = event.currentTarget?.id;
    setActiveTab(id);
    navigate("/" + id);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100  shadow-2xl z-30 dark:bg-dark-header transition-all duration-300 ease-linear">
      <div className="grid grid-cols-3 justify-around  max_width_app">
        {tabs.map((tab) => (
          <div key={tab.name} className="flex flex-col items-center">
            {/* Active Indicator */}
            <span
              className={`mb-2 h-1 w-full rounded-full transition-all duration-300 ease-linear ${
                activeTab === tab.name ? "bg-blue-500" : "bg-transparent"
              }`}
            ></span>
            <button
              onClick={handleChangeRoute}
              className={`flex flex-col w-full items-center text-sm py-2 transition-all duration-300 ease-linear ${
                activeTab === tab.name ? "text-blue-500" : "text-gray-500"
              }`}
              id={tab?.name}
            >
              {tab.name === "Wallet" && <Wallet1 />}
              {tab.name === "Message" && <Message />}
              {tab.name === "Setting" && <Setting2 />}
              <span>{tab.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar;
