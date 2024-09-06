import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ethers } from "ethers";
import * as ContractABI from '../../raw/contractABI.json';
import { ContractService } from "./contract.service";


@Global()
@Module({
    providers: [
        { 
            provide: 'EthersContract30',
            useFactory: async (configService: ConfigService) => {
                const RPC_URL = configService.get("DEDICATED_BASE_RPC_URL");
                const PRIVATE_KEY = configService.get("PRIVATE_KEY_30");
                const contractAddress = configService.get("CONTRACT_ADDRESS_30");

                const provider = new ethers.JsonRpcProvider(RPC_URL);
                const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

                return contract;
            },
            inject: [ConfigService]
        },
        { 
            provide: 'EthersContract15',
            useFactory: async (configService: ConfigService) => {
                const RPC_URL = configService.get("DEDICATED_BASE_RPC_URL");
                const PRIVATE_KEY = configService.get("PRIVATE_KEY_15");
                const contractAddress = configService.get("CONTRACT_ADDRESS_15");

                const provider = new ethers.JsonRpcProvider(RPC_URL);
                const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
                const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

                return contract;
            },
            inject: [ConfigService]
        },
        ContractService
    ],
    exports: [ContractService]
})
export class ContractModule { }