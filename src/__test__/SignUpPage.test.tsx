import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "../pages/signupPage";
import axios from "axios"; // Import the mocked axios
import { BrowserRouter as Router } from "react-router-dom"; // For routing
import "@testing-library/jest-dom";

jest.mock("axios"); // Mock axios

describe("SignUpPage Component", () => {
  test("renders the SignUpPage component", () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    expect(screen.getByText(/Create an account/i)).toBeInTheDocument();
  });

  test("submits the form and handles successful response", async () => {
    // Mock the post method
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "User created" },
    });

    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Wait for success message
    expect(
      await screen.findByText(/Sign up is Successfully/i)
    ).toBeInTheDocument();
  });

  test("handles error response", async () => {
    // Mock the post method to return an error
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Signup failed"));

    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

    // Wait for error message
    expect(
      await waitFor(() => screen.findByText(/Signup failed/i))
    ).toBeInTheDocument();
  });
});
