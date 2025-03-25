import { Categories } from "../enums/categories";

export interface Transaction {
    _id?:string;
    user?:string;
    name:string;
    description:string;
    category?:Categories;
    date:Date;
    price:number;
}

export enum TransactionType {
    outgoing,
    incomming
}