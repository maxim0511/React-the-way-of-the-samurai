import { PhotosType } from './../Types/types';
import { Profiletype } from "../Types/types";
import { instance,ResponseType } from "./API";

type SavePhotoType = {
    photos:PhotosType
}

export const ProfileAPI = {
    async getProfile (userId:number)  {
        const res = await instance.get<Profiletype>(`profile/` + userId);
        return res.data;
    },
    async getStatus(userId:number)  {
        const res = await instance.get<string>(`profile/status/` + userId);
        return res.data;
    },
    async updateStatus(status:string)  {
        const res = await instance.put<ResponseType>(`profile/status`, { status: status });
        return res.data;
    },
    async savePhoto(photoFile:File) {
        const formData = new FormData();
        formData.append("image",photoFile);
        const res = await instance.put<ResponseType<SavePhotoType>>(`profile/photo`, formData);
        return res.data;
    },
    async saveProfile(Profile:Profiletype) {
        const res = await instance.put<ResponseType>(`/profile`, Profile);
        return res.data;
    }
}