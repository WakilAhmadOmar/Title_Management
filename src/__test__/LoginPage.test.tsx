import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../pages/loginPage";
import { AuthContext } from "../components/context/authContext";
import axios from "axios"; // Import axios directly
import { BrowserRouter as Router } from "react-router-dom"; // For routing
import "@testing-library/jest-dom";

jest.mock("axios"); // Mock axios

describe("LoginPage Component", () => {
  const setIsLogin = jest.fn(); // Mock setIsLogin function

  const renderWithAuthContext = () => {
    return render(
      <AuthContext.Provider value={{ setIsLogin }}>
        <Router>
          <LoginPage />
        </Router>
      </AuthContext.Provider>
    );
  };

  test("renders the LoginPage component", () => {
    renderWithAuthContext();

    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Log in to your account below/i)
    ).toBeInTheDocument();
  });

  test("submits the form and handles successful response", async () => {
    // Mock the post method
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "mock_token" },
    });

    renderWithAuthContext();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(setIsLogin).toHaveBeenCalledWith(true); // Check if setIsLogin is called with true
      expect(screen.getByText(/Login is Successfully/i)).toBeInTheDocument(); // Check if success message is displayed
    });
  });

  test("handles error response", async () => {
    // Mock the post method to return an error
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Login failed"));

    renderWithAuthContext();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument(); // Check if error message is displayed
    });
  });

  test("handles empty email and password fields", async () => {
    renderWithAuthContext();

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(
      await waitFor(() => screen.getAllByText(/This field is required/i)?.[0])
    ).toBeInTheDocument(); // Check required field error messages for email
    expect(
      await waitFor(() => screen.getAllByText(/This field is required/i)?.[1])
    ).toBeInTheDocument(); // Check required field error messages for password
  });
});
