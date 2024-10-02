import React from "react";

import { Routes, Route } from "react-router-dom";
import WalletPage from "../pages/walletPage";
import Messages from "../pages/messages";
import SettingPage from "../pages/settingPage";
import { APP_MESSAGE, APP_SETTING, APP_WALLET } from "../assets/routes";

function RoutersComponent() {
  return (
    <Routes>
      <Route path={APP_WALLET} Component={WalletPage} />
      <Route path={APP_MESSAGE} Component={Messages} />
      <Route path={APP_SETTING} Component={SettingPage} />
    </Routes>
  );
}

export default RoutersComponent;
