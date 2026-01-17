import { CardI } from "./card";
import { UserI } from "./userI";

export interface CollectionI {
    cards:CardI[];
    user:UserI;
    publicity:string;
    id:number
}