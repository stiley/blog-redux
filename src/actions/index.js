import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // use lodash to get unique user IDs
    const userIDs = _.map(getState().posts, 'userId') // get all userId's from posts
    const uniqueIDs = _.uniq(userIDs); // unique
    uniqueIDs.forEach((id) =>{
        dispatch(fetchUser(id)) // get user details
    })
}


export const fetchPosts = () => {
    return async (dispatch) => {
        const response = await jsonPlaceholder.get('/posts');
        // console.log(response);
        dispatch({type:'FETCH_POSTS', payload: response.data});
    };
};


export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:'FETCH_USER', payload: response.data});

};



// memoize version
// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type:'FETCH_USER', payload: response.data});
// });

// const _fetchUser = _.memoize(async (id,dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type:'FETCH_USER', payload: response.data});
// });