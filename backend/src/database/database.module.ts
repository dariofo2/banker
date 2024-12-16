import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Account } from "./entity/account.entity";
import { Movement } from "./entity/movement.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type:'mariadb',
            host:'db',
            port:3306,
            username:'root',
            password:'abc123.',
            database: 'banker',
            entities: [User,Account,Movement],
            synchronize: true,
        }),
    ],
})

export class DatabaseModule {}