import { Allocation } from "./allocation";

export interface Budget {
    _id?:string;
    user?:string;
    total?:number;
    allocations:Allocation[];
    start_date:Date;
    end_date:Date;
}