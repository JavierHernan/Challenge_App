import { csrfFetch } from './csrf';

// Action Types
const CREATE_COMPLETED_BOUNTY = 'completedBounty/CREATE_COMPLETED_BOUNTY';
const SET_COMPLETED_BOUNTIES = 'completedBounty/SET_COMPLETED_BOUNTIES';

// Action Creators
const createCompletedBountyAction = (completedBounty) => ({
    type: CREATE_COMPLETED_BOUNTY,
    completedBounty,
});
const setCompletedBountiesAction = (completedBounties) => ({
    type: SET_COMPLETED_BOUNTIES,
    completedBounties,
});

// Thunk for creating a completed bounty
export const createCompletedBounty = (completedBountyData) => async (dispatch) => {
    const response = await csrfFetch('/api/completed-bounty', {
        method: 'POST',
        body: JSON.stringify(completedBountyData),
    });
    
    if (response.ok) {
        const completedBounty = await response.json();
        dispatch(createCompletedBountyAction(completedBounty));
        return completedBounty;
    }
};
export const fetchCompletedBounties = () => async (dispatch) => {
    const response = await csrfFetch('/api/completed-bounty');

    if (response.ok) {
        const completedBounties = await response.json();
        console.log("COMPLETEDBOUNTIES", completedBounties)
        dispatch(setCompletedBountiesAction(completedBounties));
    }
};

// Reducer (Add this to your completedBounty reducer)
const initialState = {};

const completedBountyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COMPLETED_BOUNTY:
            return { ...state, [action.completedBounty.id]: action.completedBounty };
        case SET_COMPLETED_BOUNTIES: // New case for fetching completed bounties
            const newState = {};
            action.completedBounties.forEach(bounty => {
                newState[bounty.id] = bounty;
            });
            return newState;
        default:
            return state;
    }
};

export default completedBountyReducer;