import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcrypt";
import { plainToClass } from "class-transformer";
import { writeFile } from "fs";
import { mkdir } from "fs/promises";
import { DatabaseRepository } from "src/database/database.repository";
import { ListRequestDatatablesDTO } from "src/database/dto/dataTables/listRequestDatatables.dto";
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
        //Split into Format and PhotoData
        const infoPhoto=photo.split(",")[0];
        const photoData=photo.split(",")[1];
        const format=((infoPhoto.split(";")[0]).split("/")[1]);
        
        //Convert base64 to Blob
        const photoDataBlob=Buffer.from(photoData,"base64url");

        //Check Formats
        if (format=="jpg" || format=="jpeg" || format=="png") {
            //Dir Paths
            const dirPath=`${__dirname}/../../../public/photos`;
            const filePath=`${__dirname}/../../../public/photos/${user.id}.${format}`;
            const urlToClient=`photos/${user.id}.${format}`;

            await mkdir(dirPath,{recursive:true});
            await writeFile(filePath,photoDataBlob,(error)=>{
                if (error) throw new BadRequestException("Error on Creating File");
                console.log("file Created");
                const userToUpdate= plainToClass(Users,{
                    id:user.id,
                    photo:urlToClient
                });
                
                this.databaseRepository.updateUser(userToUpdate);
            });
        
        } else throw new BadRequestException("Formato de Archivo inválido");
    }

    async getUser (user: Users) {
        return this.databaseRepository.getUserById(user);
    }



    //      A D M I N       S E R V I C E S
    async adminList (ListRequestDatatablesDTO:ListRequestDatatablesDTO) {
        return await this.databaseRepository.listUsers(ListRequestDatatablesDTO);
    }  

}