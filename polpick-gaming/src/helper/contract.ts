import { ethers } from "ethers";

const ContractABI = require("../../abi/contractABI.json")
export default function getContract(){
    const PRIVATE_KEY :any= process.env.PRIVATE_KEY_30
    const contractAddress :any= process.env.CONTRACT_ADDRESS_30

    // const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    // const primaryProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL_1);
    // const secondaryProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL_2);
    // const provider = new ethers.FallbackProvider([
    //     primaryProvider,
    //     secondaryProvider
    // ]);
    const provider = new ethers.JsonRpcProvider(process.env.DEDICATED_BASE_RPC_URL);

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

    return contract;
}

export function getContractTwo(){
    // const POLYGON_RPC_URL : any= process.env.POLYGON_RPC_URL
    const PRIVATE_KEY :any= process.env.PRIVATE_KEY_15
    const contractAddress :any= process.env.CONTRACT_ADDRESS_15

    // const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    const provider = new ethers.JsonRpcProvider(process.env.DEDICATED_BASE_RPC_URL);
    // const primaryProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL_1);
    // const secondaryProvider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL_2);
    // const provider = new ethers.FallbackProvider([
    //     primaryProvider,
    //     secondaryProvider
    // ]);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

    return contract;
}