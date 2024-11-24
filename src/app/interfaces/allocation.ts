import { Categories } from "../enums/categories";

export interface Allocation {
    category:Categories;
    allocated_amount:number;
}