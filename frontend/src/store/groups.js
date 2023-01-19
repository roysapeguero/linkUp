import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'groups/LOAD_GROUPS'
const GET_GROUP = 'groups/GET_GROUPS'
const EDIT_GROUP = 'groups/EDIT_GROUP'
const CREATE_GROUP = 'groups/CREATE_GROUP'

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

export const editGroup = (group) => {
  return {
    type: EDIT_GROUP,
    payload: group
  }
}

export const makeGroup = (group) => {
  return {
    type: CREATE_GROUP,
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

export const updateGroup = (group, groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(editGroup(data));
    return data;
  }
};

export const createGroup = (group) => async (dispatch) => {
  const response = await csrfFetch('api/groups', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group)
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(makeGroup(data));
    return data;
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
      return newState
    case EDIT_GROUP:
      newState = {
        ...state,
        allGroups: { ...state.allGroups, [action.payload.id]: {
            ...state.allGroups[action.payload.id],
            ...action.payload,
          },
        },
        singleGroup: { ...state.singleGroup},
      };
      return newState;
    case CREATE_GROUP:
      newState = {...state, [action.payload]: {numMembers: 1}}
      return newState;
    default:
      return state;
  }
}

export default groupsReducer;
