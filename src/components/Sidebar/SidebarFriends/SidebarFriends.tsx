import React from "react";

type PropsType = {
    name:string
}

const SidebarFriends:React.FC<PropsType> = (props) => {
    return (
        <div >
            {props.name}
        </div>
    )
}

export default SidebarFriends;