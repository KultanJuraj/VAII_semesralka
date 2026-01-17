export interface CardI{
    id:number;
    name:string;
    cardType:CardType;
    oracleText?:string;
    flavorText?:string;
    manaValue?:ManaValue;
    versions:CardVersion[];
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
 
export interface CardVersion {
    id:number;
    image:string;
    rarity:string;
    expansion:string;
}