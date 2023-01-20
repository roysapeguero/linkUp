import { csrfFetch } from "./csrf";

const LOAD_EVENTS = 'events/LOAD_EVENTS'
const GET_EVENT = 'events/GET_EVENT'
// const CREATE_EVENT = 'events/CREATE_EVENT'
// const DELETE_EVENT = 'events/DELETE_EVENT'

export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events
  }
}

export const loadEvent = (event) => {
  return {
    type: GET_EVENT,
    payload: event
  }
}

// export const makeEvent = (event) => {
//   return {
//     type: CREATE_EVENT,
//     payload: event
//   }
// }

// export const deleteEvent = (eventId) => {
//   return {
//     type: DELETE_EVENT,
//     payload: eventId
//   }
// }

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch('/api/events')

  if (response.ok) {
    const data = await response.json()
    dispatch(loadEvents(data))
    return data
  }
}

export const getEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`)

  if (response.ok) {
    const event = await response.json()
    const groupRes = await csrfFetch(`/api/groups/${event.groupId}`)
    if (groupRes.ok) {
      const group = await groupRes.json()
      const dataObj = {...event, ...group}
      dispatch(loadEvent(dataObj))
      return dataObj;
    }
  }
}

// export const createGroup = (event, image) => async (dispatch) => {
//   const response = await csrfFetch('/api/events', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(event)
//   });
//   if (response.ok) {
//     const event = await response.json();
//     const imgRes = await csrfFetch(`/api/events/${event.id}/images`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(image)
//     })
//     if (imgRes.ok) {
//       const img = imgRes.json()
//       const dataObj = {...event, ...img}
//       dispatch(makeEvent(dataObj));
//       return dataObj;
//     }
//   }
// }

// export const deleteEventThunk = (eventId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/events/${eventId}`, {
//     method: "DELETE"
//   })
//   if (response.ok) {
//     const data = await response.json()
//     dispatch(deleteEvent(eventId))
//     return data
//   }
// }


const initialState = {allEvents: {}, event: {}}

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD_EVENTS:
      newState = { ...state, allEvents: {...state.allEvents}, event: {...state.event} };
      action.payload.Events.forEach(event => (
        newState.allEvents[event.id] = event
      ))
      return newState
    case GET_EVENT:
      newState = {...state, event: {...state.event, ...action.payload}}
      return newState
    // case CREATE_GROUP:
    //   newState = { ...state, allGroups: {...state.allGroups}};
    //   newState.allGroups[action.payload.id] = action.payload;
    //   return newState;
    // case DELETE_GROUP:
    //   newState = {...state, ...action.payload}
    //   delete newState.allGroups[action.payload]
    //   return newState
    default:
      return state;
  }
}

export default eventsReducer;
