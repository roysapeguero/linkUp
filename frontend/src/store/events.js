import { csrfFetch } from "./csrf";

const LOAD_EVENTS = "events/LOAD_EVENTS";
const GET_EVENT = "events/GET_EVENT";
const CREATE_EVENT = "events/CREATE_EVENT";
const DELETE_EVENT = "events/DELETE_EVENT";
const GET_ATTENDEES = "events/GET_ATTENDEES";
const ADD_ATTENDEE = "events/ADD_ATTENDEE";
const DELETE_ATTENDEE = "events/DELETE_ATTENDEE";

export const loadEvents = (events) => {
  return {
    type: LOAD_EVENTS,
    payload: events,
  };
};

export const loadEvent = (event) => {
  return {
    type: GET_EVENT,
    payload: event,
  };
};

export const makeEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const loadAttendees = (attendees) => {
  return {
    type: GET_ATTENDEES,
    payload: attendees,
  };
};

export const addAttendee = (attendee) => {
  return {
    type: ADD_ATTENDEE,
    payload: attendee,
  };
};

export const deleteAttendee = (attendeeId) => {
  return {
    type: DELETE_ATTENDEE,
    payload: attendeeId,
  };
};

export const getEvents = () => async (dispatch) => {
  const response = await csrfFetch("/api/events");

  if (response.ok) {
    const event = await response.json();
    dispatch(loadEvents(event));
    return event;
  }
};

export const getEvent = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`);
  if (response.ok) {
    const event = await response.json();
    const groupRes = await csrfFetch(`/api/groups/${event.groupId}`);
    if (groupRes.ok) {
      const group = await groupRes.json();
      event.Group = { ...group };
      event.groupImg = group.GroupImages[0]?.url;
      dispatch(loadEvent(event));
      return event;
    }
  }
};

export const createEvent = (event, groupId, image) => async (dispatch) => {
  const response = await csrfFetch(`/api/groups/${groupId}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (response.ok) {
    const event = await response.json();
    const imgRes = await csrfFetch(`/api/events/${event.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(image),
    });
    if (imgRes.ok) {
      const img = await imgRes.json();
      event.previewImage = img.url;
      dispatch(makeEvent(event));
      return event;
    }
  }
};

export const deleteEventThunk = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteEvent(eventId));
    return data;
  }
};

export const getAttendees = (eventId) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendees`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadAttendees(data));
    return data;
  }
};

export const addAttendeeThunk = (eventId, attendee) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendee),
  });
  if (response.ok) {
    dispatch(addAttendee(attendee));
    return attendee;
  }
};

export const deleteAttendeeThunk = (eventId, attendee) => async (dispatch) => {
  const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
    method: "DELETE",
    body: JSON.stringify(attendee),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteAttendee(attendee.id));
    return data;
  }
};

const initialState = { allEvents: {}, event: {}, allEvents: {} };

const eventsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_EVENTS:
      let filler = {};
      action.payload.Events.forEach((event) => {
        filler[event.id] = event;
      });
      newState = { ...state };
      newState.allEvents = { ...filler };
      return newState;
    case GET_EVENT:
      newState = {
        ...state,
        allEvents: { ...state.allEvents },
        event: { ...state.event, ...action.payload },
      };
      return newState;
    case CREATE_EVENT:
      newState = { ...state, allEvents: { ...state.allEvents } };
      newState.allEvents[action.payload.id] = action.payload;
      return newState;
    case DELETE_EVENT:
      newState = { ...state, allEvents: { ...state.allEvents }, event: {} };
      delete newState.allEvents[action.payload];
      return newState;
    case GET_ATTENDEES:
      newState = { ...state, allAttendees: {} };
      action.payload.Attendees.forEach(
        (attendee) => (newState.allAttendees[attendee.id] = attendee)
      );
      return newState;
    case ADD_ATTENDEE:
      newState = { ...state, ...state.allAttendees };
      newState.allAttendees[action.payload.id] = action.payload;
      newState.event.numAttending += 1;
      return newState;
    case DELETE_ATTENDEE:
      newState = { ...state, allAttendees: { ...state.allAttendees } };
      newState.event.numAttending -= 1;
      delete newState.allAttendees[action.payload];
      return newState;
    default:
      return state;
  }
};

export default eventsReducer;
