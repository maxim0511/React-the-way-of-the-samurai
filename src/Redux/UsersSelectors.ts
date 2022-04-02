import { createSelector } from "reselect"
import { AppStateType } from "./ReduxStore";

 const GetUsersSelectors = (State:AppStateType) => {
    return State.UsersPage.users
}
export const GetUsers= createSelector(GetUsersSelectors,(users) =>{
    return users.filter(u=>true);
});
export const GetPageSize = (State:AppStateType) => {
    return State.UsersPage.pageSize
}
export const GetTotalUsersCount = (State:AppStateType) => {
    return State.UsersPage.totalUsersCount
}
export const GetCurrentPage = (State:AppStateType) => {
    return State.UsersPage.currentPage
}
export const GetIsFetching = (State:AppStateType) => {
    return State.UsersPage.isFetching
}
export const GetFollowingInProgress= (State:AppStateType) => {
    return State.UsersPage.followingInProgress
}
export const GetUsersFilter= (State:AppStateType) => {
    return State.UsersPage.filter
}