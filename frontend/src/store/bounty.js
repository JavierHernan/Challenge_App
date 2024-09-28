import { csrfFetch } from './csrf';

//Constants LOAD(READ) - ADD(CREATE) - UPDATE - DELETE
const SET_BOUNTIES = 'bounty/setBounties';
const ADD_BOUNTY = 'bounty/addBounty';
const UPDATE_BOUNTY = 'bounty/updateBounty';
const DELETE_BOUNTY = 'bounty/deleteBounty';

//Action Creator
//view all bounties
const setBounties = (bounties) => {
    return {
        type: SET_BOUNTIES,
        payload: bounties
    }
}
//add bounty
const addBounty = (bounty) => {
    return {
        type: ADD_BOUNTY,
        payload: bounty
    };
};
// Update bounty
const updateBounty = (bounty) => {
    return {
        type: UPDATE_BOUNTY,
        payload: bounty
    };
};
// Delete bounty
const deleteBounty = (bountyId) => {
    return {
        type: DELETE_BOUNTY,
        payload: bountyId
    };
};

//Thunks
// Fetch all bounties
export const fetchBounties = () => async (dispatch) => {
    const response = await csrfFetch('/api/bounties');
    if (response.ok) {
        const bounties = await response.json();
        dispatch(setBounties(bounties));
    }
};
// Create a new bounty
export const createBounty = (bountyData) => async (dispatch) => {
    const response = await csrfFetch('/api/bounties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bountyData)
    });

    if (response.ok) {
        const newBounty = await response.json();
        dispatch(addBounty(newBounty));
    }
};
// Update an existing bounty
export const updateExistingBounty = (bountyId, bountyData) => async (dispatch) => {
    const response = await csrfFetch(`/api/bounties/${bountyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bountyData)
    });

    if (response.ok) {
        const updatedBounty = await response.json();
        dispatch(updateBounty(updatedBounty));
    }
};
// Delete a bounty
export const removeBounty = (bountyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bounties/${bountyId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteBounty(bountyId));
    }
};

//Initialize State + Reducer
const initialState = {
    bounties: []
};
const bountyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOUNTIES:
            return { ...state, bounties: action.payload };
        case ADD_BOUNTY:
            return { ...state, bounties: [...state.bounties, action.payload] };
        case UPDATE_BOUNTY:
            return {
                ...state,
                bounties: state.bounties.map((bounty) =>
                    bounty.id === action.payload.id ? action.payload : bounty
                ),
            };
        case DELETE_BOUNTY:
            return {
                ...state,
                bounties: state.bounties.filter(bounty => bounty.id !== action.payload)
            };
        default:
            return state;
    }
};

export default bountyReducer;