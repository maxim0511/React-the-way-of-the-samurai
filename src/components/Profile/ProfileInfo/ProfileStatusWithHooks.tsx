import React, { ChangeEvent, useEffect, useState }  from "react";

type PropsType = {
    status:string,
    updateStatus:(status:string)=>void
}

const ProfileStatusWithHooks:React.FC<PropsType> = (props) =>  {

    let [editMode,setEditMode]= useState(false);
    let [status,setStatus]= useState(props.status);
    useEffect(()=> {
        setStatus(props.status)
    },[props.status]);
    const activateEditMode = () => {
        setEditMode(true);
    }
    const DeactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    //e!
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
        return (
        <div>
            {!editMode &&
                <div>
                    <b>Статус</b>-<span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} 
                            autoFocus={true}
                             onBlur={DeactivateEditMode} 
                             value={status}>
                     </input>
                </div>
            }
        </div>
        )
    }

export default ProfileStatusWithHooks;