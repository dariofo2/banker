import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./entity/users.entity";
import { Accounts } from "./entity/accounts.entity";
import { Movements } from "./entity/movements.entity";
import { DatabaseRepository } from "./database.repository";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: process.env.DATABASE_TYPE as "mysql" | "mariadb" | "postgres",
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [Users, Accounts, Movements],
                synchonize: false,
                cache: {
                    type: "redis",
                    options: {
                        password: process.env.REDIS_PASSWORD,
                        socket: {
                            host: process.env.REDIS_HOST,
                            port: process.env.REDIS_PORT
                        }
                    }
                }
            })
        }),
        TypeOrmModule.forFeature([Users, Accounts, Movements])
    ],
    providers: [DatabaseRepository],
    exports: [
        TypeOrmModule,
        DatabaseRepository
    ]
})

export class DatabaseModule { }