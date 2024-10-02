// src/global.d.ts
interface EthereumProvider {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  // Add other properties or methods as needed
}

interface Window {
  ethereum?: EthereumProvider;
}
