import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";


@Controller('user')
export class UsersController {
    constructor (
        private usersService: UsersService,
        private rabbitmqService: RabbitMQ
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

       await this.rabbitmqService.sendMessageToExchange("yyyy","holaa");
       //return await this.rabbitmqService.receiveMessageFromQueueExchange("holaaaa","comoo");
    }

    @Post('rabbitmqreceive') 
    async rabbitConsumeMessage() {
        console.log("receive");
        //return await this.rabbitmqService.receiveMessageFromQueue("buenass");
        let strings= await this.rabbitmqService.receiveMessageFromQueueExchange("hhhh","yyyy");
        console.log(strings);
        
    }

}