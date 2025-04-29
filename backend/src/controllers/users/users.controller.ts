import { BadRequestException, Body, Controller, Get, MessageEvent, Post, Req, Res, Sse, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import { fromEvent, interval, map, Observable } from "rxjs";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventEmitter } from "events";
import { Response } from "express";
import { DeleteUserDTO } from "src/database/dto/users/deleteUser.dto";
import { plainToInstance } from "class-transformer";
import { UpdateUserPasswordDTO } from "src/database/dto/users/updateUserPassword.dto";
import { UpdateUserDto } from "src/database/dto/users/updateUser.dto";
@Controller('user')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private rabbitmqService: RabbitMQ,
        private eventEmitter: EventEmitter2
    ) { }

    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.

    @UseGuards(MainAuthGuard)
    @Post('delete')
    async deleteUser(@Body() deleteUserDTO: DeleteUserDTO, @Req() req: any,@Res({passthrough:true}) res:Response) {
        const user: Users = plainToInstance(Users,deleteUserDTO);
        user.id=req.user.id;
        
        try {
            await this.usersService.deleteUser(user);
            res.cookie("JWTToken","")
        } catch (error) {
            console.log(error);
            throw new BadRequestException;
        }
    }

    @UseGuards(MainAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('update')
    async updateUser(@Req() req: any, @Body() updateUserDTO: UpdateUserDto) {
        const user: Users = plainToInstance(Users,updateUserDTO);
        user.id=req.user.id;
        user.password=undefined;
        await this.usersService.updateUser(user);
    }

    @UseGuards(MainAuthGuard)
    @Post('updatePassword')
    @UsePipes(new ValidationPipe())
    async updateUserPassword(@Req() req: any, @Body() updateUserPasswordDTO: UpdateUserPasswordDTO) {
        const user: Users = plainToInstance(Users,updateUserPasswordDTO);
        user.id=req.user.id;
        user.email=undefined;
        user.accounts=undefined;
        user.name=undefined;
        
        await this.usersService.updateUser(user);
    }

    @Post('rabbitmqsend')
    async sendConsumeMessage() {

        //await this.rabbitmqService.sendMessageToQueue("buenass","holaa");
        //return await this.rabbitmqService.receiveMessageFromQueue("holaa");
        console.log("send");

        await this.rabbitmqService.sendMessageToExchange("exchange3", "holaass");
        //return await this.rabbitmqService.receiveMessageFromQueueExchange("holaaaa","comoo");
    }

    @Post('rabbitmqreceive')
    async rabbitConsumeMessage() {
        console.log("receive");
        //return await this.rabbitmqService.receiveMessageFromQueue("buenass");
        return await this.rabbitmqService.receiveMessageFromQueueExchange("mmm", "oo");

    }

    @Sse('sse')
    ssefunc(): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter, "evento").pipe(map(x => { return { data: x } as MessageEvent }))
    }

    @Post('sseevent')
    sseevent() {
        this.eventEmitter.emit("evento", "Holaa")
        let emitter = new EventEmitter()
        this.eventEmitter.emit("Hola", { data: "hola" });
        return;
    }

}