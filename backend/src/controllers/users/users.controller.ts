import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, MessageEvent, Post, Req, Res, SerializeOptions, Sse, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MainAuthGuard } from "src/auth/mainauth.guard";
import { Users } from "src/database/entity/users.entity";
import { RabbitMQ } from "src/rabbitmq/rabbitmq.service";
import { fromEvent, interval, map, Observable } from "rxjs";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EventEmitter } from "events";
import { Response } from "express";
import { DeleteUserDTO } from "src/database/dto/users/deleteUser.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { UpdateUserPasswordDTO } from "src/database/dto/users/updateUserPassword.dto";
import { UpdateUserDto } from "src/database/dto/users/updateUser.dto";
import { UpdateUserPhotoDTO } from "src/database/dto/users/updateUserPhoto.dto";
import { ListRequestDatatablesDTO } from "src/database/dto/dataTables/listRequestDatatables.dto";
import { UpdateUserAdminDTO } from "src/database/dto/users/updateUserAdmin.dto";
import { AdminAuthGuard } from "src/auth/authRoles/adminAuth.guard";
@Controller('user')
@UsePipes(new ValidationPipe({transform:true}))
@UseInterceptors(ClassSerializerInterceptor)
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
    async deleteUser(@Req() req: any,@Res({passthrough:true}) res:Response) {
        const user:Users=req.user;
        
        try {
            await this.usersService.deleteUser(user);
            res.cookie("JWTToken","")
        } catch (error) {
            console.log(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @UseGuards(MainAuthGuard)
    @Post('update')
    async updateUser(@Req() req: any, @Body() updateUserDTO: UpdateUserDto) {
        try {
        const user: Users = plainToInstance(Users,updateUserDTO);
        user.id=req.user.id;
        return await this.usersService.updateUser(user);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @UseGuards(MainAuthGuard)
    @Post('get')
    async getUser(@Req() req: any) {
        const user=new Users;
        user.id=req.user.id;
        
        return await this.usersService.getUser(user);
    }

    
    @UseGuards(MainAuthGuard)
        // ExcludeExtraneousValues takes @expose() only, the others cancel. 
    @Post('updatePassword')
    async updateUserPassword(@Req() req: any, @Body() updateUserPasswordDTO: UpdateUserPasswordDTO) {
        try {
        const user:Users= plainToInstance(Users,req.user);
        
         await this.usersService.updateUserPassword(user,updateUserPasswordDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @UseGuards(MainAuthGuard)
        // ExcludeExtraneousValues takes @expose() only, the others cancel. 
    @Post('updatePhoto')
    async updateUserPhoto(@Req() req: any, @Body() updateUserPhotoDTO: UpdateUserPhotoDTO) {
        try {
        const user:Users= plainToInstance(Users,req.user);
        
         await this.usersService.updateUserPhoto(user,updateUserPhotoDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }


    //      A D M I N       C O N T R O L L E R S
    @UseGuards(MainAuthGuard,AdminAuthGuard)
    @Post('adminList')
    async adminList (@Body() ListRequestDatatablesDTO: ListRequestDatatablesDTO) {
        try {
            return await this.usersService.adminList(ListRequestDatatablesDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @UseGuards(MainAuthGuard,AdminAuthGuard)
    @Post('adminUpdate')
    async adminUpdate (@Body() updateUserAdminDTO: UpdateUserAdminDTO) {
        try {
            return await this.usersService.adminUpdate(updateUserAdminDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }

    @UseGuards(MainAuthGuard,AdminAuthGuard)
    @Post('adminUpdatePassword')
    async adminUpdatePassword (@Body() updateUserAdminDTO: UpdateUserAdminDTO) {
        try {
            return await this.usersService.adminUpdatePassword(updateUserAdminDTO);
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message)
            } else {
                throw new BadRequestException("Fatal Error");
            }
        }
    }
    /*
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
        */

}