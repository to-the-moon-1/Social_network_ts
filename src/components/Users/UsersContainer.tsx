import React from 'react';
import {useSelector} from "react-redux";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {getIsFetching,} from "../../redux/users-selectors";

type UsersPagePropsType = {
    pageTitle: string,
}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)

    return <>
        {/*<h2>{props.pageTitle}</h2>*/}
        {isFetching ? <Preloader /> : null}
        <Users
            // totalUsersCount={this.props.totalUsersCount}
            // pageSize={this.props.pageSize}
            // currentPage={this.props.currentPage}
            // onPageChanged={this.onPageChanged}
            // onFilterChanged={this.onFilterChanged}
            // users={this.props.users}
            // follow={this.props.follow}
            // unfollow={this.props.unfollow}
            // toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            // followingInProgress={this.props.followingInProgress}
        />
    </>
}

export default UsersPage;







// type MapStatePropsType = {
//     currentPage: number,
//     pageSize: number,
//     isFetching: boolean,
//     totalUsersCount: number,
//     users: Array<UserType>,
//     followingInProgress: Array<number>,
//     filter: FilterType,
// }
//
// type MapDispatchPropsType = {
//     getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
//     unfollow: (userId: number) => void,
//     follow: (userId: number) => void,
// }
//
// type OwnPropsType = {
//     pageTitle: string,
// }
//
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

// class UsersContainer extends React.Component<PropsType> {
//     componentDidMount() {
//         const {currentPage, pageSize, filter} = this.props
//         this.props.getUsers(currentPage, pageSize,filter);
//     }
//
//     onPageChanged = (pageNumber: number) => {
//         const {pageSize, filter} = this.props
//         this.props.getUsers(pageNumber, pageSize, filter);
//     }
//
//     onFilterChanged = (filter: FilterType) => {
//         const {pageSize} = this.props
//         this.props.getUsers(1, pageSize, filter);
//     }
// }

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType => {
//     return {
//         users: getAllUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         filter: getUsersFilter(state),
//     }
// }
//
// export default compose(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
//         {follow, unfollow, getUsers})
// ) (UsersContainer)