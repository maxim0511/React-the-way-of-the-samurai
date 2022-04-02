import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateType } from "../../Redux/ReduxStore";

type mapStateToPropsForRedirectType = {
    isAuth:boolean
}

let mapStateToPropsForRedirect = (State:AppStateType):mapStateToPropsForRedirectType => ({
    isAuth: State.auth.isAuth
});

export const withAuthRedirect = (Component:React.ComponentType) => {
    class RedirectComponent extends React.Component<mapStateToPropsForRedirectType> {
        render () {
                if (!this.props.isAuth) return <Redirect to={'/Login'}/>; 
                return <Component {...this.props}/>
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect,{})(RedirectComponent); 
    return connectedAuthRedirectComponent
}