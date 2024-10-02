import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RoutersComponent from "./routers/routers";
import { accessToken } from "./assets/constant";
import AuthRoutes from "./routers/authRoutes";
import { AuthContext } from "./components/context/authContext";
import CircularLoader from "./components/CircleLoader";
import Layout from "./components/layout";

const App: React.FC = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const { isLogin, setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem(accessToken);
    if (token) {
      setIsLogin(true);
      setLoadingPage(false);
    } else {
      setLoadingPage(false);
    }
  }, []);

  if (loadingPage) {
    return <CircularLoader />;
  }
  return (
    <div className="max_width_app ">
      <BrowserRouter>
        {isLogin ? (
          <Layout>
            <RoutersComponent />
          </Layout>
        ) : (
          <AuthRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
