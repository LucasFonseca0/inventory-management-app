import { Request } from "express";
import { User } from "src/user/entities/user.entity";
import { UserLogin } from "./userLogin";

export interface AuthRequest extends Request{
    user:UserLogin;
}