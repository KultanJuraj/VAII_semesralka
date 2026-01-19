import { CardVersion } from "./card";
import { UserI } from "./userI";

export interface CollectionI {
    cardVersion:CardVersion[],
    user:UserI;
    publicity:string;
    id:number
    name:string
}