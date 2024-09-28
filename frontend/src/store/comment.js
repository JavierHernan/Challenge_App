import { csrfFetch } from './csrf';

//Constants LOAD(READ) - ADD(CREATE) - UPDATE - DELETE
const SET_COMMENTS = 'comments/setComments';
const ADD_COMMENT = 'comments/addComment';
const UPDATE_COMMENT = 'comments/updateComment';
const DELETE_COMMENT = 'comments/deleteComment';

//Action Creator
//view all comments for a commentId
const setComments = (comments) => {
    return {
        type: SET_COMMENTS,
        payload: comments
    }
}

//add comment
const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    };
};

// Update comment
const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    };
};

// Delete comment
const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: commentId
    };
};

//Thunks
// Fetch all comments by bountyId
export const fetchComments = (bountyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bounties/${bountyId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(setComments(comments));
        return comments;
    }
};

// Create a new comment
export const createComment = (bountyId, commentData) => async (dispatch) => {
    const response = await csrfFetch(`/api/bounties/${bountyId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
        return comment;
    }
};

// Update an existing bounty
export const editComment = (commentId, commentData) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(updateComment(updatedComment));
        return updatedComment;
    }
};

// Delete a bounty
export const removeComment = (commentId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
};

//Initialize State + Reducer
const initialState = {};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMMENTS:
            const newState = {};
            action.payload.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        case ADD_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        case DELETE_COMMENT:
            const stateCopy = { ...state };
            delete stateCopy[action.payload];
            return stateCopy;
        default:
            return state;
    }
};

export default commentReducer;