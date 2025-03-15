import dotenv from 'dotenv';
import { ethers } from 'ethers';
dotenv.config();

function connectContract() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
    const contractAddress = process.env.CONTRACT_ADDRESS as string;
    const contractABI = JSON.parse(process.env.CONTRACT_ABI as string);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    return contract;
}

export default connectContract();
