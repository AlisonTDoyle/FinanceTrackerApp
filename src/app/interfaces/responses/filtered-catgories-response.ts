import { Category } from "../category";

export interface FilteredCatgoriesResponse {
    categories: Category[];
    totalDocs:number;
}
