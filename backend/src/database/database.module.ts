import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type:'mariadb',
            host:'db',
            port:3306,
            username:'root',
            password:'abc123.',
            database: 'banker',
            entities: [Users,Accounts,Movements],
            synchronize: false,
        }),
        TypeOrmModule.forFeature([Users,Accounts,Movements])
    ],
    exports: [
        TypeOrmModule
    ]
})

export class DatabaseModule {}