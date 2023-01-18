import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'groups/LOAD_GROUPS'
const GET_GROUP = 'groups/GET_GROUPS'

export const loadGroups = (groups) => {
  return {
    type: LOAD_GROUPS,
    payload: groups
  }
}

export const loadGroup = (group) => {
  return {
    type: GET_GROUP,
    payload: group
  }
}


export const getGroups = () => async (dispatch) => {
  const response = await csrfFetch("/api/groups")

  if (response.ok) {
    const data = await response.json()
    dispatch(loadGroups(data))
  }
}

export const getGroup = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`)
  if (response.ok) {
    const data = await response.json()
    dispatch(loadGroup(data))
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
      return newState
    case GET_GROUP:
      newState = {...state, group:{...state.group, ...action.payload}}
      console.log(newState)
      return newState
    default:
      return state;
  }
}

export default groupsReducer;
