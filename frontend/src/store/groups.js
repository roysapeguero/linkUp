import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'groups/LOAD_GROUPS'

export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups
  }
}


export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups")

  if (response.ok) {
    const data = await response.json()
    dispatch(loadGroups(data))
  }
}

const initialState = {allGroups: {}, group: {}}

const groupsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_GROUPS:
      newState = {...state}
      action.payload.Groups.forEach(group => (
        newState.allGroups[group.id] = group
      ))
      console.log(newState)
      return newState
    default:
      return state;
  }
}

export default groupsReducer;
