import { IOrder } from "../interface/Order";

interface IUsers extends IOrder {
    totalReturn?: number;
}

class BettingHelper {
    /**
     * Calculate the service fee for a given bet amount
     * @param amount - The original bet amount
     * @returns The service fee deducted from the bet
     */
    static calculateServiceFee(amount: number): number {
        return (amount * 11) / 100;
    }

    /**
     * Calculate the net bet amount after deducting the service fee
     * @param amount - The original bet amount
     * @returns The net bet amount after service fee deduction
     */
    static calculateNetBetAmount(amount: number): number {
        return amount - BettingHelper.calculateServiceFee(amount);
    }

    /**
     * Calculate the winnings distribution for the players on the winning side
     * @param winningBets - Array of net bet amounts on the winning side
     * @param totalLosingAmount - Total net amount bet on the losing side
     * @returns An array of winnings for each player on the winning side
     */
    static calculateWinnings(winningBets: number[], totalLosingAmount: number): number[] {
        const totalWinningAmount = winningBets.reduce((sum, bet) => sum + bet, 0);
        return winningBets.map(bet => (bet * totalLosingAmount) / totalWinningAmount);
    }

    /**
     * Calculate the total return amount for each player, including their original bet
     * @param winningUsers - Array of user objects on the winning side
     * @param totalLosingAmount - Total net amount bet on the losing side
     * @returns Array of user objects with an additional totalReturn field
     */
    static calculateTotalReturns(winningUsers: IUsers[], totalLosingAmount: number): any {
        const netWinningBets = winningUsers.map(user => BettingHelper.calculateNetBetAmount(user.netTradeAmount));
        const winnings = BettingHelper.calculateWinnings(netWinningBets, totalLosingAmount);

        return winningUsers.map((user, index) => ({
            gameId: user.gameId,
            orderId: user._id,
            walletId: user.walletId,
            betFor: user.betFor,
            tradeAmount: user.tradeAmount,
            username: user.username,
            profile_image: user.profile_image,
            totalReturn: winnings[index] + netWinningBets[index],
        }));
    }
}

export default BettingHelper;