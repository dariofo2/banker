import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseRepository } from "src/database/database.repository";

@Injectable()
export class AuthLoginService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private jwtService: JwtService
    ) { }
    async login(username: string, password: string) {
        let user = await this.databaseRepository.login(username, password);
        if (user == null) return user;
        else {
            const payload = { id: user.id, name: user.name, password: user.password, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
    }
} 