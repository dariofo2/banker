import axios, { Axios, AxiosError, AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from "axios";
import Cookies from "js-cookie";
import { CreateUserDTO } from "../classes/dto/users/createUser.dto";
import { Users } from "../classes/entity/users.entity";
import { UserLoginDTO } from "../classes/dto/auth/loginUser.dto";
import { UserLoginResp } from "../classes/dto/auth/userLoginResp.dto";
import { Movements } from "../classes/entity/movements.entity";
import { DeleteMovementDTO } from "../classes/dto/movements/deleteMovement.dto";
import { ListMovementsDTO } from "../classes/dto/movements/listMovements.dto";
import { Accounts } from "../classes/entity/accounts.entity";
import { GetAccountDTO } from "../classes/dto/accounts/getAccount.dto";
import CreateMovementDTO from "../classes/dto/movements/createMovement.dto";
import { DeleteAccountDTO } from "../classes/dto/accounts/deleteAccount.dto";
import { DeleteUserDTO } from "../classes/dto/users/deleteUser.dto";
import { UpdateUserPasswordDTO } from "../classes/dto/users/updateUserPassword.dto";
import { UpdateUserDto } from "../classes/dto/users/updateUser.dto";
import { CreateAccountDTO } from "../classes/dto/accounts/createAccount.dto";

export class RequestObject {
    headers: AxiosHeaders = new AxiosHeaders;

    constructor(jwtToken: string = "") {
        this.headers.authorization = jwtToken;
        this.headers["Content-Type"] = "application/json";
    }

}

export class axiosFetchs {
    static URL=process.env.NEXT_PUBLIC_BACKEND_URL


    //          L O G I N
    /**
     * Fetch a Login to Backend and set Cookies + JWT Token
     * @param {UserLoginDTO} userLoginDto
     * @returns {Promise<Boolean>} Booleano
     */
    static async fetchLogin(userLoginDto:UserLoginDTO): Promise<AxiosResponse<UserLoginResp>|AxiosError> {
        try {
            let response = await axios.post<UserLoginResp>(
                `${this.URL}/auth/login`,
                userLoginDto,
                {
                    withCredentials:true,
                }
            );

            //await this.SetcookiesAtLogin(userLoginFetch);
            return response;
        } catch (error){
            this.logoutRemoveCookies();
            return <AxiosError>error;
        }
    }

    //          L O G O U T
    /**
     * Logout User
     * 
     * @returns {Promise<Boolean>} Booleano
     */
    static async logout(): Promise<AxiosResponse|AxiosError> {
        try {
            let response = await axios.post<UserLoginResp>(
                `${this.URL}/auth/login`,
                {
                    withCredentials:true,
                }
            );
            this.logoutRemoveCookies();
            return response;
        } catch (error){
            this.logoutRemoveCookies();
            return <AxiosError>error;
        }
    }



    //      C O O K I E S
    static async SetcookiesAtLogin(userLoginResp: UserLoginResp) {
        Cookies.set("user", JSON.stringify(userLoginResp));
    }

    static async logoutRemoveCookies() {
        Cookies.remove("user");
    }



    //      A X I O S   E R R O R S
    static async handleAxiosError(error: AxiosError): Promise<any> {
        if (error.status == 401) {
            await this.logoutRemoveCookies();
            window.location.replace("http://localhost:5000/login");
        }
    }



    //      U S E R S
    static async createUser(createUserDto:CreateUserDTO): Promise<AxiosResponse|AxiosError> {
        try {
        const response=await axios.post(
            `${this.URL}/auth/signin`,
            createUserDto,
            {
                withCredentials:true
            }
        )
        return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error
        }
    }

    static async deleteUser(deleteUserDTO:DeleteUserDTO): Promise<AxiosResponse|AxiosError> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response=await axios.post(
                "http://localhost:3000/user/delete",
                deleteUserDTO,
                reqObject
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
        
    }

    /*
    static async getUser(deleteUserDTO:DeleteUserDTO): Promise<AxiosResponse|AxiosError> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response=await axios.post(
                "http://localhost:3000/user/delete",
                { id: id },
                reqObject
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return false;
        }
        
    }
        */

    static async updateUser(updateUserDTO:UpdateUserDto) : Promise<AxiosResponse|AxiosError> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response= await axios.post(
                "http://localhost:3000/user/update",
                updateUserDTO,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
        
    }

    static async updateUserPassword(updateUserPasswordDTO:UpdateUserPasswordDTO) : Promise<AxiosResponse|AxiosError> {
        try {
            const response= await axios.post(
                "http://localhost:3000/user/update",
                updateUserPasswordDTO,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
        
    }



    //      A C C O U N T S
    static async createAccount(createAccountDTO: CreateAccountDTO): Promise<AxiosResponse|AxiosError> {
        try {
            const response=await axios.post(
                `${this.URL}/account/create`,
                createAccountDTO,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }

    static async deleteAccount(deleteAccountDTO:DeleteAccountDTO): Promise<AxiosResponse|AxiosError> {
        try {
            const response=await axios.post(
                `${this.URL}/account/delete`,
                deleteAccountDTO,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }


    static async fetchAccounts(): Promise<AxiosResponse<Accounts[]>|AxiosError> {
        try {
            let response = await axios.post<Accounts[]>(
                `${this.URL}/accounts/lists`,
                {},
                {
                    withCredentials:true
                }
            );
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }

    static async setAccountIdCookie (accountId:number) {
        Cookies.set("accountId",accountId.toString());
    }
    
    static async getAccount(getAccountDTO:GetAccountDTO): Promise<AxiosResponse<Accounts>|AxiosError> {
        try {
            let response = await axios.post<Accounts>(
                `${this.URL}/accounts/list`,
                getAccountDTO,
                {
                    withCredentials:true
                }
            );
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }



    //      M O V E M E N T S
    static async createMovement(createMovementDto:CreateMovementDTO): Promise<AxiosResponse|AxiosError> {
        try {
            const response = await axios.post(
                `${this.URL}/movement/create`,
                createMovementDto,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }

    static async deleteMovement(deleteMovementDTO:DeleteMovementDTO): Promise<AxiosResponse|AxiosError> {
        try {
            let response = await axios.post(
                `${this.URL}/movement/delete`,
                deleteMovementDTO,
                {
                    withCredentials:true
                }
            )
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }

    }

    static async listMovementsByAccount(listMovementsDTO:ListMovementsDTO): Promise<AxiosResponse<Movements[]>|AxiosError> {
        try {
            let response = await axios.post<Movements[]>(
                `${this.URL}/movements/list`,
                listMovementsDTO,
                {
                    withCredentials:true
                }
            );
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }

    static async getMovement(listMovementsDTO:ListMovementsDTO): Promise<AxiosResponse<Movements>|AxiosError> {
        try {
            let response = await axios.post<Movements>(
                `${this.URL}/movements/list`,
                listMovementsDTO,
                {
                    withCredentials:true
                }
            );
            return response;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            return <AxiosError>error;
        }
    }
}
