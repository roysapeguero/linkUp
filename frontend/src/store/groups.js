import { csrfFetch } from './csrf';

const LOAD_GROUPS = 'groups/LOAD_GROUPS'
const GET_GROUP = 'groups/GET_GROUPS'
const EDIT_GROUP = 'groups/EDIT_GROUP'
const CREATE_GROUP = 'groups/CREATE_GROUP'
const DELETE_GROUP = 'groups/DELETE_GROUP'
const GET_MEMBERS = 'groups/GET_MEMBERS'
const ADD_MEMBER = 'groups/ADD_MEMBER'
const DELETE_MEMBER = 'groups/DELETE_MEMBER'

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

export const deleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    payload: groupId
  }
}

export const loadMembers = (members) => {
  return {
    type: GET_MEMBERS,
    payload: members
  }
}

export const addMemeber = (member) => {
  return {
    type: ADD_MEMBER,
    payload: member
  }
}

export const deleteMember = (memberId) => {
  return {
    type: DELETE_MEMBER,
    payload: memberId
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

export const createGroup = (group, image) => async (dispatch) => {
  const response = await csrfFetch('/api/groups', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(group)
  });
  if (response.ok) {
    const group = await response.json();
    const imgRes = await csrfFetch(`/api/groups/${group.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    })
    if (imgRes.ok) {
      const img = imgRes.json()
      group.previewImage = img.url
      dispatch(makeGroup(group));
      return group;
    }
  }
}

export const deleteGroupThunk = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(deleteGroup(groupId))
    return data
  }
}

export const getMembers = (groupId) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/members`)

  if (response.ok) {
    const data = await response.json()
    dispatch(loadMembers(data))
    return data
  }
}

export const addMemeberThunk = (groupId, member) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member)
  });
  console.log('i got here', member)
  if (response.ok) {
    dispatch(addMemeber(member));
    return member;
  }
}

export const deleteMemberThunk = (groupId, member) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
    method: "DELETE",
    body: JSON.stringify(member)
  })
  if (response.ok) {
    const data = await response.json()

    dispatch(deleteMember(member.id))
    return data
  }
}




const initialState = {allGroups: {}, group: {}, allMembers: {}}

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
        group: { ...state.group},
      };
      return newState;
    case CREATE_GROUP:
      newState = { ...state, allGroups: {...state.allGroups}};
			newState.allGroups[action.payload.id] = action.payload;
      return newState;
    case DELETE_GROUP:
      newState = { ...state, allGroups: {...state.allGroups} }
      delete newState.allGroups[action.payload]
      return newState
    case GET_MEMBERS:
      newState = {...state, allMembers: {}}
      action.payload.Members.forEach(member => (
        newState.allMembers[member.id] = member
      ))
      return newState
    case ADD_MEMBER:
      newState = {...state, ...state.allMembers}
      newState.allMembers[action.payload.id] = action.payload;
      newState.group.numMembers += 1
      return newState;
    case DELETE_MEMBER:
      newState = { ...state, allMembers: {...state.allMembers} }
      newState.group.numMembers -= 1
      delete newState.allMembers[action.payload]
      return newState;
    default:
      return state;
  }
}

export default groupsReducer;
