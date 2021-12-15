import {actions, followThunk, unfollowThunk} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api')
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result));
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test("follow thunk", async () => {
    const thunk = followThunk(1);

    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccess( 1));
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingInProgress(false, 1));
})

test("unfollow thunk", async () => {
    const thunk = unfollowThunk(1);

    // @ts-ignore
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.unfollowSuccess( 1));
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingInProgress(false, 1));
})
