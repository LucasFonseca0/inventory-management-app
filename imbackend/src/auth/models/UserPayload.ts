export interface UserPayload{
    email:string;
    name:string;
    isAdmin: boolean;
    iat?:number;
    exp?:number;
}