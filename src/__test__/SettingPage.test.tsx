import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SettingPage from "../pages/settingPage";
import { AuthContext } from "../components/context/authContext";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SettingPage Component", () => {
  const setIsLogin = jest.fn();

  const renderWithAuthContext = () => {
    return render(
      <AuthContext.Provider value={{ setIsLogin }}>
        <Router>
          <SettingPage />
        </Router>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.spyOn(Storage.prototype, "removeItem");
    // Reset the mock function before each test
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders the user profile and logout button", () => {
    renderWithAuthContext();

    expect(screen.getByText("Wakil Ahmad Omari")).toBeInTheDocument();
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark Theme/i)).toBeInTheDocument();
  });

  test("logs the user out when 'Log Out' button is clicked", () => {
    // Mock localStorage.removeItem
    const removeItemSpy = jest.spyOn(localStorage, "removeItem");

    renderWithAuthContext();

    // Simulate click on "Log Out"
    fireEvent.click(screen.getByText(/Log Out/i));

    // Expect the access token to be removed from localStorage
    expect(removeItemSpy).toHaveBeenCalledWith("A@dfksdf");

    // Check if login state is updated
    expect(setIsLogin).toHaveBeenCalledWith(false);

    // Check if navigation to home page occurs
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("toggles between dark and light theme", () => {
    renderWithAuthContext();

    // Initially, the theme is light (Dark Theme button is visible)
    const darkThemeButton = screen.getByText(/Dark Theme/i);
    fireEvent.click(darkThemeButton);

    // Expect the body class to toggle the dark theme
    expect(document.body.classList.contains("dark")).toBe(true);

    // Now, the button should show 'Light Theme'
    expect(screen.getByText(/Light Theme/i)).toBeInTheDocument();

    // Toggle back to light theme
    const lightThemeButton = screen.getByText(/Light Theme/i);
    fireEvent.click(lightThemeButton);

    // Expect the body class to remove dark theme
    expect(document.body.classList.contains("dark")).toBe(false);
  });
});
