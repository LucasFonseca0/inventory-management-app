import { Injectable } from '@nestjs/common'

@Injectable({})
export class AuthService{
    signup(){
        return 'i am signed up'
    }
    signin(){
        return 'i am signed in'
    }
}