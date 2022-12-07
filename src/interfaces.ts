export interface IRegister {
    name: string;
    email: string;
    phone: number;
    username: string;
    account: string;
    password: string;
}

export interface ICurrentVault {

}

export interface IGetVaultResponse {
    success: boolean;
    data: ICurrentVault;
    
}