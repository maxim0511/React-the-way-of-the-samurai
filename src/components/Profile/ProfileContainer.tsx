import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile,getStatus, updateStatus, savePhoto ,saveProfile} from "../../Redux/ProfileReducer";
import { compose } from "redux";
import { AppStateType } from "../../Redux/ReduxStore";
import { Profiletype } from "../../Types/types";
import { RouteComponentProps, withRouter } from "react-router-dom";


type PathParamsType = {
    userId: string,
}
type DispType = {
    getUserProfile:(userId:number | null)=>void,
    getStatus:(userId:number | null)=>void,
    savePhoto:(file:File)=>void,
    updateStatus:(status:string)=>void,
    saveProfile:(profile:Profiletype)=>Promise<any>
}
type MapPropsType = ReturnType<typeof mapStateToProps>

 type PropsType = RouteComponentProps<PathParamsType> & DispType & MapPropsType

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId=this.props.authorizedUserId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId);      
        this.props.getStatus(userId)
    }
    componentDidMount(){
        this.refreshProfile();
    }
    componentDidUpdate (prevProps:PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
    }
    render () {
         
        return (
            <Profile {...this.props} Profile={this.props.Profile}
                status={this.props.status} updateStatus={this.props.updateStatus}
                isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto}
            />
        )
    }
}
let mapStateToProps = (State:AppStateType) => ({
    Profile:State.ProfilePage.Profile,
    status: State.ProfilePage.status,
    authorizedUserId: State.auth.id,
    isAuth: State.auth.isAuth
})
export default compose<React.ComponentType> (
    connect(mapStateToProps,{getUserProfile, getStatus, updateStatus,
        savePhoto,saveProfile
    }),
    withRouter
) (ProfileContainer);