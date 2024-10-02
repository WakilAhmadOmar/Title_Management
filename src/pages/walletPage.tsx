import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { AuthContext, TokenBalance } from "../components/context/authContext";
import {
  ArrowDown,
  ArrowSwapHorizontal,
  ArrowUp,
  Copy,
  More,
} from "iconsax-react";
import Message, { MessageType } from "../components/messages";
import { tokenList } from "../assets/data";

// Minimal ERC-20 ABI (just the `balanceOf` function)
const ERC20_ABI = ["function balanceOf(address owner) view returns (uint256)"];

// Interface for token balance information
const WalletPage: React.FC = () => {
  const {
    walletAddress,
    walletBalance,
    tokenBalances,
    setWalletAddress,
    setWalletBalance,
    setTokenBalances,
  } = useContext(AuthContext);

  const [handleError, setHandleError] = useState<{
    type: MessageType;
    message: string;
    show: boolean;
  }>({
    type: "error",
    message: "",
    show: false,
  });

  const initializeProvider = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Initialize the ethers provider
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request accounts from MetaMask
        const accounts = await web3Provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        // Get the ETH balance
        const balance = await web3Provider.getBalance(address);
        setWalletBalance(ethers.utils.formatEther(balance));

        // Fetch token balances for the listed ERC-20 tokens
        const tokenBalances = await fetchTokenBalances(web3Provider, address);
        console.log("tokenBalances", tokenBalances);
        setTokenBalances(tokenBalances);
      } catch (error: any) {
        setHandleError({
          show: true,
          message: `Failed to connect to MetaMask: ${error.message}`,
          type: "error",
        });
      }
    } else {
      setHandleError({
        show: true,
        message:
          "MetaMask is not installed. Please install it to use this app.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    // Listen for account changes in MetaMask
    if (window?.ethereum) {
      window?.ethereum?.on("accountsChanged", (accounts: string[]) => {
        setWalletAddress(accounts[0]);
      });
    }
  }, []);

  // Function to fetch ERC-20 token balances
  const fetchTokenBalances = async (
    provider: ethers.providers.Web3Provider,
    address: string
  ): Promise<TokenBalance[]> => {
    const balances = await Promise.all(
      tokenList?.map(async (token) => {
        const contract = new ethers.Contract(
          token.address,
          ERC20_ABI,
          provider
        );
        const balance = await contract.balanceOf(address);
        return {
          symbol: token.symbol,
          balance: ethers.utils.formatUnits(balance, token.decimals),
          name: token.name,
          image: token.icon,
        };
      })
    );
    return balances;
  };

  const HandleCloseMessage = () => {
    setHandleError((pre) => ({
      ...pre,
      show: false,
    }));
  };
  return (
    <div>
      {handleError?.show && (
        <Message
          type={handleError?.type}
          message={handleError?.message}
          handleClose={HandleCloseMessage}
        />
      )}
      <div className="h-screen grid pt-20 items-center overflow-y-auto pb-20">
        {walletAddress ? (
          <>
            <p className="text-center font-normal text-sm pt-3 dark:text-white">
              Your Balance
            </p>
            <div className="flex justify-center items-center gap-2  h-fit -mt-2">
              <p className="text-gray-500 text-xs font-light">
                {" "}
                {walletAddress?.slice(0, 10)}...
                {walletAddress?.slice(
                  walletAddress?.length - 10,
                  walletAddress?.length - 1
                )}
              </p>
              <button className="font-bold text-gray-600 w-9 h-9 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 ease-linear">
                <Copy size={20} />
              </button>
            </div>
            <h2 className="text-center font-bold text-3xl dark:text-white">
              $ {walletBalance}
            </h2>
            <div className="p-6">
              <div className="flex justify-around py-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-9 h-9 rounded-full border  flex justify-center items-center cursor-pointer  hover:bg-blue-700  transition-all duration-300 ease-linear text-white bg-blue-500">
                    <ArrowUp size={16} className="rotate-45 transform" />
                  </div>
                  <p className="font-light text-sm dark:text-white">Send</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-9 h-9 rounded-full border  flex justify-center items-center cursor-pointer  hover:bg-blue-700  transition-all duration-300 ease-linear text-white bg-blue-500">
                    <ArrowDown size={16} />
                  </div>
                  <p className="font-light text-sm dark:text-white">Resive</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-9 h-9 rounded-full border  flex justify-center items-center cursor-pointer  hover:bg-blue-700  transition-all duration-300 ease-linear text-white bg-blue-500">
                    <ArrowSwapHorizontal size={16} />
                  </div>
                  <p className="font-light text-sm dark:text-white">Swap</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-9 h-9 rounded-full border  flex justify-center items-center cursor-pointer  hover:bg-blue-700  transition-all duration-300 ease-linear text-white bg-blue-500">
                    <More size={16} />
                  </div>
                  <p className="font-light text-sm dark:text-white">More</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl text-gray-500 dark:text-white">
                  Tokens
                </h2>
                <p className="font-normal text-sm text-gray-400 dark:text-gray-300">
                  View all
                </p>
              </div>
              <ul>
                {tokenBalances.map((token: any) => (
                  <div
                    key={token.symbol}
                    className="grid grid-cols-[4rem_auto] bg-white mt-2 py-3 px-5 rounded-2xl dark:bg-dark-inputBgC"
                  >
                    <div className="w-[44px] h-[44px] rounded-full bg-white flex justify-center items-center">
                      <img
                        src={token.image}
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="grid">
                        <p className="font-semibold text-lg text-gray-700 dark:text-white">
                          {" "}
                          {token.name}
                        </p>
                        <p className="font-normal text-sm text-gray-400 dark:text-gray-300">
                          {token.symbol}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-gray-700 dark:text-white">
                          ${token.balance}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center w-full ">
            <button
              onClick={initializeProvider}
              className=" bg-blue-500 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 ease-linear"
            >
              Connect Wallet
            </button>
            <p className="dark:text-white pt-2">Plesze connect your wallet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;
