import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class MainAuthGuard implements CanActivate {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    //(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token=request.headers.authorization;
        console.log(token);
        let userpass=token.split(":");

        let user=await this.databaseRepository.login(userpass[0],userpass[1]);
        if (user!=null) return true;
        else false;
    }
}