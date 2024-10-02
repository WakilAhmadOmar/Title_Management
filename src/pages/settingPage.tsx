import { LogoutCurve, Moon, Sun1 } from "iconsax-react";
import { useContext } from "react";
import { accessToken } from "../assets/constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/authContext";

function SettingPage() {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  const handleLogOut = () => {
    localStorage.removeItem(accessToken);
    setIsLogin(false);
    navigate("/");
  };

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="p-6  transition-all duration-300 ease-linear pt-20">
      <div className=" flex justify-center py-5 flex-col items-center">
        <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
        <h1 className="font-semibold text-xl text-gray-600 pt-2 dark:text-white">
          Wakil Ahmad Omari
        </h1>
      </div>
      <div
        onClick={handleLogOut}
        className="bg-white mt-16 dark:text-white flex px-3 py-3 items-center gap-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 ease-linear cursor-pointer dark:bg-dark-inputBgC"
      >
        <LogoutCurve />
        <p className=" font-medium text-sm">Log Out </p>
      </div>
      <div
        onClick={toggleTheme}
        className="bg-white mt-2 dark:text-white flex px-3 py-3 items-center gap-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 ease-linear cursor-pointer dark:bg-dark-inputBgC"
      >
        <Moon className=" dark:hidden" />
        <Sun1 className="hidden dark:flex" />
        <p className=" font-medium text-sm dark:hidden">Dark Theme </p>
        <p className=" font-medium text-sm hidden dark:flex">Light Theme </p>
      </div>
    </div>
  );
}

export default SettingPage;
