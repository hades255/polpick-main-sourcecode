import { Injectable } from "@nestjs/common";
import { ITradeUsers } from "src/websocket/interface/websocket.interface";

@Injectable()
export class BetCalculator {
    betAmount: number;
    referral: boolean;

    constructor(betAmount: number, referral: boolean = false) {
        this.betAmount = betAmount;
        this.referral = referral;
    }

    calculateDeductions(): {
        totalDeduction: number,
        serviceFee: number,
        jackpotAmount: number,
        websiteShare: number,
        referralAmount: number,
        netTradeAmount: number,
    } {
        const totalDeductionPercentage: number = 0.11; // Total deduction percentage
        const serviceFeePercentage: number = 0.01; // Percentage of service fee
        const jackpotPercentage: number = 0.01; // Percentage of jackpot

        // Calculate total deduction amount
        const totalDeduction: number = this.betAmount * totalDeductionPercentage;

        // Calculate service fee
        const serviceFee: number = totalDeduction * serviceFeePercentage;

        // Calculate jackpot amount
        const jackpotAmount: number = totalDeduction * jackpotPercentage;

        // Calculate remaining amount after deducting service fee and jackpot amount
        let remainingAmount: number = totalDeduction - (serviceFee - jackpotAmount);
        let referralAmount: number = 0;

        // If there's a referral, calculate referral bonus
        if (this.referral) {
            const referralBonusPercentage: number = 0.3;
            const referralBonus: number = remainingAmount * referralBonusPercentage;
            remainingAmount -= referralBonus;
            referralAmount = referralBonus;
        }

        // Calculate winner amount
        const netTradeAmount: number = this.betAmount - totalDeduction;

        return {
            totalDeduction: totalDeduction,
            serviceFee: serviceFee,
            jackpotAmount: jackpotAmount,
            websiteShare: remainingAmount,
            referralAmount: referralAmount,
            netTradeAmount: netTradeAmount
        };
    }

    static calculateProfitForPlayers(players: ITradeUsers[], totalTradeOpposite: number): number {
        const totalCurrentSideAmount = players.reduce((acc, player) => acc + player.tradeAmount, 0);
        const totalOppositeAmount = totalTradeOpposite;

        const profitResults: any[] = players.map(player => {
            // Calculate profit for each player using the total trade amount of the opposite group
            const proportion = player.tradeAmount / totalCurrentSideAmount;
            const distributedAmount = totalOppositeAmount * proportion;
            const percentageReturn = (distributedAmount / player.tradeAmount) * 100;
            return {
                walletId: player.walletId,
                profitAmount: (distributedAmount + player.tradeAmount).toFixed(2),
                profitPercentage: parseInt(percentageReturn as any) + 100
            };
        });

        if(profitResults.length) {
            return profitResults[0]?.profitPercentage || 200;
        }
        return 200;
    }
}