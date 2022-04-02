import axios from "axios";
import { UsersType } from "../Types/types";

export const instance = axios.create({
    withCredentials:true,
    baseURL:`https://social-network.samuraijs.com/api/1.0/`,
    headers:{"API-KEY":"c923109d-6681-4281-a01e-9f6bacca3a49",
    }
})

export type ResponseType<D = {},RC =resultCodeEnum > = {
    data:D,
    messages:Array<string>,
    resultCode:RC
}
export enum resultCodeEnum {
    Succes=0,
    Error=1,
    CaptchaIsRequired=10,
}
export type GetUsersType = {
    items:Array<UsersType>,
    totalCount:number,
    error:string | null
}
