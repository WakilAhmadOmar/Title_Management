import BottomTabBar from "../BottomTabBar";
import { Heading1 } from "../typography";

const Layout = (props: any) => {
  return (
    <div>
      <header className="fixed top-0 w-full z-10   left-0 shadow-sm dark:bg-dark-header transition-all duration-300 ease-linear">
        <nav className="max_width_app flex justify-between h-20 items-center px-5">
          <Heading1 text="Title Menagement" />
          <div className=" w-12 h-12 rounded-full bg-gray-200"></div>
        </nav>
      </header>
      <main className="">{props?.children}</main>
      <footer className="">
        <BottomTabBar />
      </footer>
    </div>
  );
};

export default Layout;
