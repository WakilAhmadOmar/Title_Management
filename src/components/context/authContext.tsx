import { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

export interface TokenBalance {
  symbol: string;
  balance: string;
}
const AuthContextComponent = ({ children }: { children: any }) => {
  const [isLogin, setIsLogin] = useState(false);

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<string>("0");
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        walletAddress,
        setWalletAddress,
        walletBalance,
        setWalletBalance,
        tokenBalances,
        setTokenBalances,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
