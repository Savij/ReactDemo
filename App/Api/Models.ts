export interface IToken {
    access_token?: string;
    expires_in?: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface INoResponse { }

export interface IMe {
    firstName?: string;
    lastName?: string;
}