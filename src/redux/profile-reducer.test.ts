import profileReducer, { actions } from './profile-reducer';

let state = {
  posts: [
    { id: 1, message: 'It is my first post', likesCount: 20, reposts: 5 },
    { id: 2, message: 'Hi, how are you?', likesCount: 15, reposts: 4 },
  ],
  profile: null,
  status: '',
  newPostText: '',
};

it('new post should be added', () => {
  let action = actions.addPostActionCreator('Here is a test');

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  let action = actions.addPostActionCreator('Here is a test');

  let newState = profileReducer(state, action);

  expect(newState.posts[2].message).toBe('Here is a test');
});
