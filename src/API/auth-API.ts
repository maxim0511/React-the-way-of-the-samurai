import { instance,ResponseType } from "./API";

type MeDataType = {
    id:number,
    email:string,
    login:string,
}
type LoginDataType = {
    userId:number
}

export const authAPI ={
    async me () {
        const res = await instance.get<ResponseType<MeDataType>>(`auth/me`);
        return res.data;
    }, 
    async login(email:string,password:string,rememberMe= false, captcha:null | string= null) {
        const res = await instance.post<ResponseType<LoginDataType>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout () {
        return instance.delete<ResponseType>(`auth/login`)
    }
}