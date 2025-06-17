import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { Users } from "src/database/entity/users.entity";

/**
 * ALWAYS GO AFTER AUTH.GUARD, NEVER BEFORE
 */
@Injectable()
export class AdminAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user:Users=request.user;
        
        if (user.role==2) return true;
        else throw new UnauthorizedException("Se necesita Rol de Administrador para realizar esta acción");
    }
}