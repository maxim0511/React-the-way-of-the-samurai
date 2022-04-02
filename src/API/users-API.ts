import { UsersType } from "../Types/types";
import { instance,ResponseType,GetUsersType } from "./API";

export const usersAPI = {
    async getUsers (currentPage:number,pageSize:number,term:string='',friend:null | boolean = null)  {
        const res = await instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return res.data;
    },
    Follow (userId:number)  {
         return instance.post<ResponseType>(`follow/${userId}`, {}).then(res=>res.data);
    },
     UnFollow  (userId:number)  {
        return instance.delete(`follow/${userId}`, {}).then(res=>res.data) as Promise<ResponseType>;
    },
} 