import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { plainToClass } from "class-transformer";
import { writeFile } from "fs";
import { DatabaseRepository } from "src/database/database.repository";
import { UpdateUserPasswordDTO } from "src/database/dto/users/updateUserPassword.dto";
import { UpdateUserPhotoDTO } from "src/database/dto/users/updateUserPhoto.dto";
import { Users } from "src/database/entity/users.entity";
//import { hash } from "crypto";
@Injectable()
export class UsersService {
    constructor (
        private databaseRepository: DatabaseRepository
    ) {}

    async deleteUser (user:Users) {
        return await this.databaseRepository.deleteUserById(user);
    }

    async updateUser (user:Users) {
        return this.databaseRepository.updateUser(user);
    }

    async updateUserPassword (user:Users,updateUserPassword:UpdateUserPasswordDTO) {
        //Comprobamos la antigua contraseña
        const userResponse=await this.databaseRepository.login(user);
        const compareHash=await compare(updateUserPassword.lastPassword,userResponse.password);
        
        //Generamos una nueva contraseña
        if (compareHash) {
            const hashedPassword=await hash(updateUserPassword.password,parseInt(process.env.BCRYPT_ROUNDS));
            user.password=hashedPassword;
        } else throw new BadRequestException;

        return this.databaseRepository.updateUser(user);
    }

    async updateUserPhoto (user:Users,updateUserPhoto:UpdateUserPhotoDTO) {
        const photo=updateUserPhoto.photo
        const infoPhoto=photo.split(",")[0];
        const photoData=photo.split(",")[1];

        const photoDataBlob=Buffer.from(photoData,"base64url");

        if (infoPhoto.includes("image/jpeg") || infoPhoto.includes("image/jpg") || infoPhoto.includes("image/png")) {
            console.log(__dirname + "/../../../public/photos/hola.jpeg");
            const url=""
            await writeFile(__dirname + "/hola.jpeg",photoDataBlob,(error)=>{
                if (error) throw new BadRequestException("Error on Creating File");
                console.log("file Created");
                const userToUpdate= plainToClass(Users,{
                    id:user.id,
                    photo:url
                });
                
                this.databaseRepository.updateUser(userToUpdate);
            });
        
        } else throw new BadRequestException("Formato de Archivo inválido");
    }

    async getUser (user: Users) {
        return this.databaseRepository.getUserById(user);
    }

}