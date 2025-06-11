import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UpdateUserPhotoDTO {
    @Expose()
    photo?: string;
}