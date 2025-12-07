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
    w:number;
    u:number;
    b:number;
    r:number;
    g:number;
    c:number;
    totalValue:number;
}
export interface CardType{
    subType:string;
    type:string;
    legend:boolean;
}