import { CardVersion } from "./card";
import { UserI } from "./userI";

export interface CollectionI {
  id: number;
  items: CollectionItemI[];
  user: UserI;
  publicity: boolean;
  name: string;
}

export interface CollectionItemI {
    id:number,
    cardVersion:CardVersion,
    collection:number
}