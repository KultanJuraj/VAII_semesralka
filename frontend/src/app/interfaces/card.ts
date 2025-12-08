export interface CardI{
    id:number;
    name:string;
    cardType:CardType;
    oracleText?:string;
    flavorText?:string;
    manaValue?:ManaValue;
    cardImage:string;
    rarity:string;
    expansion:string;
}
export interface ManaValue {
    id:number;
    w:number;
    u:number;
    b:number;
    r:number;
    g:number;
    c:number;
    total:number;
}
export interface CardType{
    id:number;
    subType:string;
    type:string;
    legend:boolean;
}