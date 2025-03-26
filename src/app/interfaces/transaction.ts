import { Categories } from "../enums/categories";
import { Category } from "./category";

export interface Transaction {
    _id?:string;
    user?:string;
    name:string;
    description:string;
    category?:Category;
    date:Date;
    price:number;
}

export enum TransactionType {
    outgoing,
    incomming
}