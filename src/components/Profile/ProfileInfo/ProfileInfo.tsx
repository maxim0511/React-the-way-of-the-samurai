import React, { ChangeEvent, useState } from "react"
import Preloader from "../../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import UserPhoto from '../../../assets/images/ImgAvatar.png'
import ProfileDataForm from "./ProfileDataForm";
import { ContactsType, Profiletype } from "../../../Types/types";

type PropsType = {
    Profile: Profiletype | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: Profiletype) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    const [editMode,setEditMode]=useState(false);
    if (!props.Profile) {
        return <Preloader/>
    }
    const mainPhotoSelected =(e:ChangeEvent<HTMLInputElement> )=> {
        if (e.target.files && e.target.files.length) {
             props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = (formData:Profiletype) => {
         props.saveProfile(formData).then(()=>{
            setEditMode(false);
         })
    }
    return(
        <div>
            <div className={s.description}>
                <div className={s.description_img}>
                <img src={props.Profile.photos.large || UserPhoto} className={s.Avatar} alt='Avatar' key={'AvatarPers'}/><br/>
                {props.isOwner && <input type={'file'} onChange={mainPhotoSelected} ></input>}
                </div>
                <div className={s.description_info}>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                { editMode 
                ? <ProfileDataForm Profile={props.Profile} onSubmit={onSubmit} initialValues={props.Profile} />
                :<ProfileData Profile={props.Profile} isOwner={props.isOwner} ToEditMode={()=>{setEditMode(true)}}/>
                }
                </div>
            </div>
         </div>    
    )
  }
  type ProfileDataPropsType = {
    Profile: Profiletype
    isOwner: boolean
    ToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType>  = (props) => {
    return (
        <div>
        <div className={s.Data}>
                <div><b>Имя</b>- {props.Profile.fullName}</div>
                <div><b>Обо мне</b>- {props.Profile.aboutMe}</div>
                <div>
                    <b>Contacts</b>: {
                    Object
                        .keys(props.Profile.contacts)
                        .map((key)  => {
                    return <Contacts key={key} contactTitle={key} contactValue={props.Profile.contacts[key as keyof ContactsType]}/>
                })}
                </div>
                <div><b>Ищу Работу</b>- {props.Profile.lookingForAJob? 'Да' : 'Нет'}</div>
                { props.Profile.lookingForAJob &&
                    <div><b>Описание Работы</b>- {props.Profile.lookingForAJobDescription}</div>
                }
            </div> 
            <div className={s.buttonRedact}>
                {props.isOwner && <button onClick={props.ToEditMode} className={s.button_redact}>Редактировать</button>}
            </div>
        </div>
    )
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contacts: React.FC<ContactsPropsType>=({contactTitle,contactValue})=> {
    return(
        <div className={s.Contacts}>
            <b>{contactTitle}</b>:{contactValue}
        </div>
    )
}

export default ProfileInfo
