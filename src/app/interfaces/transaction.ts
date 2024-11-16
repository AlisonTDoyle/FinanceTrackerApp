export interface Transaction {
    id:string;
    user:string;
    name:string;
    description:string;
    date:Date;
    price:number;
    type:string;
}