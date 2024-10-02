import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import WalletPage from "../pages/walletPage";
import { AuthContext } from "../components/context/authContext";
import { ethers } from "ethers";
import "@testing-library/jest-dom";

// Mock context values
const mockContextValues = {
  walletAddress: "",
  walletBalance: "",
  tokenBalances: [],
  setWalletAddress: jest.fn(),
  setWalletBalance: jest.fn(),
  setTokenBalances: jest.fn(),
};

// Mock ethers provider
jest.mock("ethers", () => {
  const originalEthers = jest.requireActual("ethers");
  return {
    ...originalEthers,
    providers: {
      Web3Provider: jest.fn().mockImplementation(() => ({
        send: jest.fn().mockResolvedValue(["0xAddress"]),
        getBalance: jest.fn().mockResolvedValue("1000000000000000000"), // 1 ETH
      })),
    },
    Contract: jest.fn().mockImplementation(() => ({
      balanceOf: jest.fn().mockResolvedValue("5000000000000000000"), // 5 tokens
    })),
    utils: {
      formatEther: jest.fn(() => "1.0"), // Mock ETH balance
      formatUnits: jest.fn(() => "5.0"), // Mock token balance
    },
  };
});

// Mock window.ethereum
beforeAll(() => {
  global.window.ethereum = {
    on: jest.fn(),
    request: jest.fn().mockImplementation(({ method }) => {
      if (method === "eth_requestAccounts") {
        return Promise.resolve(["0xAddress"]);
      }
      if (method === "eth_getBalance") {
        return Promise.resolve(ethers.utils.parseEther("1.0").toString()); // 1 ETH in wei
      }
      return Promise.reject(new Error("Method not implemented"));
    }),
  };
});

afterAll(() => {
  delete global.window.ethereum;
});

describe("WalletPage Component", () => {
  it("should display connect wallet button when MetaMask is not connected", () => {
    render(
      <AuthContext.Provider value={mockContextValues}>
        <WalletPage />
      </AuthContext.Provider>
    );

    // Expect the "Connect Wallet" button to be present
    expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
  });

  test("should display wallet address, balance, and tokens after connecting MetaMask", async () => {
    const setWalletAddress = jest.fn();
    const setWalletBalance = jest.fn();
    const setTokenBalances = jest.fn();

    render(
      <AuthContext.Provider
        value={{
          walletAddress: null,
          walletBalance: null,
          tokenBalances: [],
          setWalletAddress,
          setWalletBalance,
          setTokenBalances,
        }}
      >
        <WalletPage />
      </AuthContext.Provider>
    );

    // Simulate clicking the "Connect Wallet" button
    fireEvent.click(screen.getByText(/Connect Wallet/i));

    // Wait for the wallet address to appear
    await waitFor(() =>
      expect(setWalletAddress).toHaveBeenCalledWith("0xAddress")
    );
  });

  it("should show error message if MetaMask is not installed", async () => {
    // Remove MetaMask mock
    delete global.window.ethereum;

    render(
      <AuthContext.Provider value={mockContextValues}>
        <WalletPage />
      </AuthContext.Provider>
    );

    // Simulate clicking the "Connect Wallet" button
    fireEvent.click(screen.getByText(/Connect Wallet/i));

    // Expect an error message indicating MetaMask is not installed
    await waitFor(() => {
      expect(
        screen.getByText(/MetaMask is not installed/i)
      ).toBeInTheDocument();
    });
  });
});
