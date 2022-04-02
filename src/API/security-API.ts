import { instance } from "./API";

type CaptchaUrlType = {
    url:string
}
export const securityAPI ={
    async getCaptchaUrl () {
        const res = await instance.get<CaptchaUrlType>(`security/get-captcha-url`);
        return res.data;
    }
}