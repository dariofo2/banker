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
import { toast } from "react-toastify";
import { ListRequestDTO } from "../classes/dto/listRequestDTO";
import { ListResponseDTO } from "../classes/dto/listResponseDTO";
import { DeleteBlockchainAccountDTO } from "../classes/dto/blockchainAccounts/deleteBlockchainAccount.dto";
import { BlockchainAccounts } from "../classes/entity/blockchainAccounts.entity";
import { GetBlockchainAccountDTO } from "../classes/dto/blockchainAccounts/getBlockChainAccount.dto";
import { UpdateBlockchainAccountDTO } from "../classes/dto/blockchainAccounts/updateBlockchainAccount.dto";
import { CreateBlockchainAccountDTO } from "../classes/dto/blockchainAccounts/createBlockchainAccount.dto";
import { UpdateAccountDTO } from "../classes/dto/accounts/updateAccount.dto";
import { DepositFromBlockChainDTO } from "../classes/dto/blockchainAccounts/depositFromBlockchain.dto";
import { DepositToBlockChainDTO } from "../classes/dto/blockchainAccounts/depositToBlockchain.dto";
import { UpdateUserPhotoDTO } from "../classes/dto/users/updateUserPhoto.dto";
import { ListRequestDatatablesDTO } from "../classes/dto/dataTables/listRequestDatatables.dto";
import { ListResponseDatatablesDTO } from "../classes/dto/dataTables/listResponseDatatables.dto";

export class RequestObject {
    headers: AxiosHeaders = new AxiosHeaders;

    constructor(jwtToken: string = "") {
        this.headers.authorization = jwtToken;
        this.headers["Content-Type"] = "application/json";
    }

}

export class axiosFetchs {
    static URL = process.env.NEXT_PUBLIC_BACKEND_URL
    static frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL

    //          L O G I N
    /**
     * Fetch a Login to Backend and set Cookies + JWT Token
     * @param {UserLoginDTO} userLoginDto
     * @returns {Promise<Boolean>} Booleano
     */
    static async fetchLogin(userLoginDto: UserLoginDTO): Promise<UserLoginResp> {
        try {
            let response = await axios.post<UserLoginResp>(
                `${this.URL}/auth/login`,
                userLoginDto,
                {
                    withCredentials: true,
                }
            );
            toast.success("Login Exitoso", {
                containerId: "axios"
            });
            await this.SetcookiesAtLogin(response.data);
            return response.data;
        } catch (error) {
            this.logoutRemoveCookies();
            this.handleAxiosError(error as AxiosError);
            throw error;
        }
    }

    //          L O G O U T
    /**
     * Logout User
     * 
     * @returns {Promise<Boolean>} Booleano
     */
    static async logout(): Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            await this.logoutRemoveCookies();
            
        } catch (error) {
            await this.logoutRemoveCookies();
            throw error;
        }
    }



    //      C O O K I E S
    static async SetcookiesAtLogin(userLoginResp: UserLoginResp) {

        Cookies.set("user", JSON.stringify(userLoginResp));
    }

    static async logoutRemoveCookies() {
        Cookies.remove("user");
        Cookies.remove("accountId");
        Cookies.remove("blockchainAccountId");
    }

    static async setAccountIdCookie(accountId: number) {
        Cookies.set("accountId", accountId.toString());
    }

    static async setBlockchainAccountIdCookie(blockchainAccountId: number) {
        Cookies.set("blockchainAccountId", blockchainAccountId.toString());
    }

    //      A X I O S   E R R O R S
    static async handleAxiosError(error: AxiosError): Promise<any> {
        if (error.status == 401) {
            await this.logoutRemoveCookies();
            await this.logout();
            window.location.replace("/");
        } else {

        }
        const messageError = (error.response?.data as any).message
        console.log(messageError)
        if (messageError instanceof Array) {
            messageError.forEach(x => {
                toast.error(x, {
                    containerId: "axios"
                });
            })
        } else {
            toast.error(messageError, {
                containerId: "axios"
            });
        }

    }



    //      U S E R S
    static async createUser(createUserDto: CreateUserDTO): Promise<UserLoginResp> {
        try {
            const response = await axios.post<UserLoginResp>(
                `${this.URL}/auth/signin`,
                createUserDto,
                {
                    withCredentials: true
                }
            )
            toast.success("Usuario Creado Correctamente", {
                containerId: "axios"
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async deleteUser(deleteUserDTO: DeleteUserDTO): Promise<void> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response = await axios.post(
                "http://localhost:3000/user/delete",
                deleteUserDTO,
                reqObject
            )
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }


    static async getUser(): Promise<Users> {
        try {
            const response = await axios.post<Users>(
                "http://localhost:3000/user/get",
                {},
                {
                    withCredentials: true
                }
            )
            const userResp=response.data;
            await this.SetcookiesAtLogin(
                {
                    id:userResp.id,
                    name:userResp.name,
                    email:userResp.email,
                    photo:userResp.photo,
                    role:userResp.role
                }
            )
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }


    static async updateUser(updateUserDTO: UpdateUserDto): Promise<void> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response = await axios.post(
                "http://localhost:3000/user/update",
                updateUserDTO,
                {
                    withCredentials: true
                }
            )

            toast.success("Usuario Actualizado Correctamente", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }

    static async updateUserPhoto(updateUserPhotoDTO: UpdateUserPhotoDTO): Promise<void> {
        let reqObject = new RequestObject(Cookies.get("access_token"));
        try {
            const response = await axios.post(
                "http://localhost:3000/user/updatePhoto",
                updateUserPhotoDTO,
                {
                    withCredentials: true
                }
            )

            toast.success("Foto Actualizada Correctamente", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }

    static async updateUserPassword(updateUserPasswordDTO: UpdateUserPasswordDTO): Promise<void> {
        try {
            const response = await axios.post(
                "http://localhost:3000/user/updatePassword",
                updateUserPasswordDTO,
                {
                    withCredentials: true
                }
            )
            toast.success("Contraseña Actualizada Correctamente", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }



    //      A C C O U N T S
    static async createAccount(createAccountDTO: CreateAccountDTO): Promise<void> {
        try {
            const response = await axios.post(
                `${this.URL}/accounts/create`,
                createAccountDTO,
                {
                    withCredentials: true
                }
            )
            toast.success("Cuenta Creada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async deleteAccount(deleteAccountDTO: DeleteAccountDTO): Promise<void> {
        try {
            const response = await axios.post(
                `${this.URL}/accounts/delete`,
                deleteAccountDTO,
                {
                    withCredentials: true
                }
            )
            toast.success("Cuenta Borrada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }


    static async fetchAccounts(): Promise<Accounts[]> {
        try {
            let response = await axios.post<Accounts[]>(
                `${this.URL}/accounts/lists`,
                {},
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async updateAccount(updateAccountDTO: UpdateAccountDTO): Promise<void> {
        try {
            const response = await axios.post(
                "http://localhost:3000/accounts/update",
                updateAccountDTO,
                {
                    withCredentials: true
                }
            )

            toast.success("Cuenta Actualizado Correctamente", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }

    static async getAccount(getAccountDTO: GetAccountDTO): Promise<Accounts> {
        try {
            let response = await axios.post<Accounts>(
                `${this.URL}/accounts/list`,
                getAccountDTO,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }



    //      M O V E M E N T S
    static async createMovement(createMovementDto: CreateMovementDTO): Promise<void> {
        try {
            const response = await axios.post(
                `${this.URL}/movements/create`,
                createMovementDto,
                {
                    withCredentials: true
                }
            )
            toast.success("Transferencia creada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async deleteMovement(deleteMovementDTO: DeleteMovementDTO): Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/movements/delete`,
                deleteMovementDTO,
                {
                    withCredentials: true
                }
            )
            toast.success("Transferencia Borrada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }

    }

    static async listMovementsByAccount(listMovementsDTO: ListRequestDTO<ListMovementsDTO>): Promise<ListResponseDTO<Movements[]>> {
        try {
            let response = await axios.post<ListResponseDTO<Movements[]>>(
                `${this.URL}/movements/list`,
                listMovementsDTO,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async getMovement(listMovementsDTO: ListMovementsDTO): Promise<Movements> {
        try {
            let response = await axios.post<Movements>(
                `${this.URL}/movements/list`,
                listMovementsDTO,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }


    //          B L O C K C H A I N     A C C O U N T S
    static async createBlockChainAccount (createBlockchainAccountDTO: CreateBlockchainAccountDTO) : Promise<void> {
        try {
            let response = await axios.post<Movements>(
                `${this.URL}/blockchainAccounts/create`,
                createBlockchainAccountDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Cuenta de Blockchain Creada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async updateBlockChainAccount (updateBlockchainAccountDTO:UpdateBlockchainAccountDTO) : Promise<void> {
        try {
            let response = await axios.post<Movements>(
                `${this.URL}/blockchainAccounts/update`,
                updateBlockchainAccountDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Cuenta de Blockchain Actualizada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async getBlockChainAccount (getBlockChainAccountDTO:GetBlockchainAccountDTO) : Promise<BlockchainAccounts> {
        try {
            let response = await axios.post<BlockchainAccounts>(
                `${this.URL}/blockchainAccounts/list`,
                getBlockChainAccountDTO,
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async listBlockChainAccounts () : Promise<BlockchainAccounts[]> {
        try {
            let response = await axios.post<BlockchainAccounts[]>(
                `${this.URL}/blockchainAccounts/lists`,
                {},
                {
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async deleteBlockChainAccount (deleteBlockChainAccountDTO: DeleteBlockchainAccountDTO) : Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/blockchainAccounts/delete`,
                deleteBlockChainAccountDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Cuenta de Blockchain Borrada con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async depositFromEthBlockChainAccount (depositFromBlockchainDTO:DepositFromBlockChainDTO) : Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/blockchainAccounts/depositFromEth`,
                depositFromBlockchainDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Deposito Ingresado con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async depositFromBCBlockChainAccount (depositFromBlockchainDTO:DepositFromBlockChainDTO) : Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/blockchainAccounts/depositFromBC`,
                depositFromBlockchainDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Deposito Ingresado con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async depositToEthBlockChainAccount (depositToBlockchainDTO:DepositToBlockChainDTO) : Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/blockchainAccounts/depositToEth`,
                depositToBlockchainDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Deposito Ingresado con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }

    static async depositToBCBlockChainAccount (depositToBlockchainDTO:DepositToBlockChainDTO) : Promise<void> {
        try {
            let response = await axios.post(
                `${this.URL}/blockchainAccounts/depositToBC`,
                depositToBlockchainDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Deposito Ingresado con Éxito", {
                containerId: "axios"
            });
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }


    //      A D M I N       A X I O S
    static async adminListUsers (depositToBlockchainDTO:ListRequestDatatablesDTO) : Promise<ListResponseDatatablesDTO<Users>> {
        try {
            let response = await axios.post<ListResponseDatatablesDTO<Users>>(
                `${this.URL}/user/adminList`,
                depositToBlockchainDTO,
                {
                    withCredentials: true
                }
            );
            toast.success("Deposito Ingresado con Éxito", {
                containerId: "axios"
            });
            return response.data;
        } catch (error) {
            this.handleAxiosError(<AxiosError>error);
            throw error;
        }
    }
}
