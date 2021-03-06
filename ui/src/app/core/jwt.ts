export interface Jwt {
    user_id: string;
    access_token:string;
    token_type:string;
    refresh_token:string;
    expires_in:number;
    scope:string;
    authorities:string[];
    jti:string;
}
