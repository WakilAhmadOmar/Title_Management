import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateMessagePage from "../pages/createMessage";
import { AuthContext } from "../components/context/authContext";
import axios from "axios";
import "@testing-library/jest-dom";

jest.mock("axios"); // Mock axios

describe("CreateMessagePage Component", () => {
  const getMessage = jest.fn(); // Mock getMessage function

  const renderWithAuthContext = (walletAddress = "mock_wallet_address") => {
    return render(
      <AuthContext.Provider value={{ walletAddress }}>
        <CreateMessagePage getMessage={getMessage} />
      </AuthContext.Provider>
    );
  };

  test("renders the 'Add Message' button", () => {
    renderWithAuthContext();
    expect(screen.getByText(/Add Message/i)).toBeInTheDocument();
  });

  test("opens modal on 'Add Message' button click", () => {
    renderWithAuthContext();

    const addMessageButton = screen.getByText(/Add Message/i);
    fireEvent.click(addMessageButton);

    expect(screen.getByText(/Popup Content/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Title Message/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Write a message about your title/i)
    ).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    // Mock API response for successful form submission
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Message created successfully" },
    });

    renderWithAuthContext();

    fireEvent.click(screen.getByText(/Add Message/i));

    fireEvent.change(screen.getByPlaceholderText(/Title Message/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Write a message about your title/i),
      {
        target: { value: "Test Description" },
      }
    );

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(getMessage).toHaveBeenCalled(); // Check if getMessage is called
      expect(
        screen.getByText(/Message create is Successfully/i)
      ).toBeInTheDocument(); // Check for success message
    });
  });

  test("handles API error", async () => {
    // Mock API response for failed form submission
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    renderWithAuthContext();

    fireEvent.click(screen.getByText(/Add Message/i));

    fireEvent.change(screen.getByPlaceholderText(/Title Message/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Write a message about your title/i),
      {
        target: { value: "Test Description" },
      }
    );

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument(); // Check for error message
    });
  });

  test("disables 'Add Message' button if walletAddress is empty", () => {
    renderWithAuthContext(""); // Pass empty walletAddress
    const addButton = screen.getByText(/Add Message/i);
    expect(addButton).toBeDisabled();
  });

  test("displays validation errors for empty fields", async () => {
    renderWithAuthContext();

    fireEvent.click(screen.getByText(/Add Message/i));
    fireEvent.click(screen.getByText(/Save/i)); // Try to submit the form without filling fields

    expect(
      await waitFor(() => screen.getAllByText(/This field is required/i)?.[0])
    ).toBeInTheDocument();
    expect(
      await waitFor(() => screen.getAllByText(/This field is required/i)?.[1])
    ).toBeInTheDocument();
  });
});
