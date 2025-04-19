import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class MainAuthGuard implements CanActivate {
    constructor (
        private databaseRepository: DatabaseRepository,
        private jwtService: JwtService
    ) {}

    //(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        //const authValue=request.headers.authorization;
        const authValue=request.cookies["JWTToken"];
        const token=this.checkAuthJwt(authValue);
        
        try {
        const payload = await this.jwtService.verifyAsync(token, {
            secret:process.env.JWT_SECRET_KEY
        });

        request["user"] = payload;
        
        } catch {
            throw new UnauthorizedException;
        }
        
        return true;
        
    }

    checkAuthJwt (authKey: string) : string {
        const [type,token]= authKey.split(' ');
        if (type=="Bearer") {
            return token;
        } else throw new UnauthorizedException;
    }
}