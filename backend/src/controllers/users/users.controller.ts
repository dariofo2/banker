import { BadRequestException, Body, Controller, Get, MessageEvent, Post, Req, Sse, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import { fromEvent, interval, map, Observable } from "rxjs";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventEmitter } from "events";
@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
        private rabbitmqService: RabbitMQ,
        private eventEmitter: EventEmitter2
    ) {}

    //el userid siempre se obtiene por el Payload de JWT: req.user lo tiene, asi que req.user.id
    //Asi evitamos que nadie pueda listar, crear o borrar cuentas que no sean suyas.
    //solo puede el user que se ha loggeado con ese token.
    
    @Post('create')
    async createUser (@Body() body ,@Req() req) {
        let insertresult=await this.usersService.createUser(body.name,body.password,body.email)
        if (!insertresult) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('delete')
    async deleteUser (@Body() body: Users,@Req() req) {
        let delresult=await this.usersService.deleteUser(req.user.id);
        if (!delresult) throw new BadRequestException;
    }

    @UseGuards(MainAuthGuard)
    @Post('update')
    updateUser (@Req() req) {
        let updatedUser=this.usersService.updateUser(req);
        if (updatedUser==null || updatedUser==undefined) throw new BadRequestException; 
    }

    @Post('rabbitmqsend')
    async sendConsumeMessage () {
        
        //await this.rabbitmqService.sendMessageToQueue("buenass","holaa");
        //return await this.rabbitmqService.receiveMessageFromQueue("holaa");
        console.log("send");

       await this.rabbitmqService.sendMessageToExchange("exchange3","holaass");
       //return await this.rabbitmqService.receiveMessageFromQueueExchange("holaaaa","comoo");
    }

    @Post('rabbitmqreceive') 
    async rabbitConsumeMessage() {
        console.log("receive");
        //return await this.rabbitmqService.receiveMessageFromQueue("buenass");
        return await this.rabbitmqService.receiveMessageFromQueueExchange("mmm","oo");
        
    }

    @Sse('sse')
    ssefunc(): Observable<MessageEvent> {
        return fromEvent(this.eventEmitter,"evento").pipe(map(x=>{return  {data: x} as MessageEvent}))
    }

    @Post('sseevent')
    sseevent() {
        this.eventEmitter.emit("evento","Holaa")
        let emitter=new EventEmitter()
        this.eventEmitter.emit("Hola",{data:"hola"});
        return;
    }

}