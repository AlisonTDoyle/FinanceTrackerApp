import { Transaction } from "./../transaction";

export interface TransactionResponse {
    transactions: Transaction[],
    totalDocs: number
}
