import { Controller, Get, Req } from "@nestjs/common";
import { DeleteService } from "./delete.service";

@Controller('delete')
export class DeleteController {
    constructor(private deleteService : DeleteService) { }

    @Get('user')
    deleteUser(@Req() request) {
        return "user Deleted";
    }

    @Get('account')
    deleteAccount() {
        return "Account Deleted";
    }

    @Get('movement')
    deleteMovement() {
        return "Movement Deleted";
    }
}