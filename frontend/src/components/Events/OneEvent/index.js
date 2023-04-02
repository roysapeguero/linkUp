import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { deleteEventThunk, getEvent, addAttendeeThunk, deleteAttendeeThunk, getAttendees } from "../../../store/events";
// import { login } from "../../../store/session";
import "./OneEvent.css";

export default function OneEventPage() {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const currentEvent = useSelector((state) => state.events.event);
  const currentUser = useSelector((state) => state.session.user);
  const eventAttendeeObj = useSelector((state) => state.events.allAttendees);

  useEffect(() => {
    dispatch(getEvent(eventId));
    dispatch(getAttendees(eventId));
  }, [dispatch, eventId]);

  const handleDelete = async (e, eventId) => {
    e.preventDefault();
    const response = await dispatch(deleteEventThunk(eventId));
    if (response.message === "Successfully deleted") {
      history.push("/events");
    }
  };

  const handleAttend = (e) => {
    e.preventDefault();
    setErrors([]);
    if (currentUser) {
      return dispatch(
        addAttendeeThunk(eventId, {
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          Attendance: {status: 'attending'}
        })
      )
      .then(() => dispatch(getAttendees(eventId)))


    }
    else {
      alert('Create an account or log in to attend this event')
    }
  };

  const handleNoAttend = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(deleteAttendeeThunk(eventId, currentUser))
  };
  console.log(eventAttendeeObj)
  const isAttendee = userId => {
    return userId in eventAttendeeObj
  }


  let isOrganizer = false;
  if (!currentEvent.EventImages) return;

  if (currentUser) {
    isOrganizer = currentEvent.Group.organizerId === currentUser.id;
  }

  if (currentEvent.numAttending === 0) currentEvent.numAttending = 1;

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const footerEventStart = new Date(currentEvent.startDate).toDateString().toUpperCase().split(' ')


  const dMD = new Date(currentEvent.startDate).toLocaleDateString(
    "en-US",
    options
  );
  const eDMD = new Date(currentEvent.endDate).toLocaleDateString(
    "en-US",
    options
  );
  const newStartDateTime = new Date(
    currentEvent.startDate
  ).toLocaleTimeString();
  const newEndDateTime = new Date(currentEvent.endDate).toLocaleTimeString();

  const eventInfo = currentEvent ? (
    <div className="one-event-page">
      <div className="one-event-container">
        <div className="name-info-container">
          <div className="name-info">
            <h1 className="one-event-group-name">{`${currentEvent.name}`}</h1>
            <div className="oe-host-info">
              <p className="circle">
                {currentEvent.Group.Organizer.firstName[0]}
              </p>
              <div className="oe-hosted">
                <p className="hosted">Hosted By </p>
                <p className="hoster-name">
                  {currentEvent.Group.Organizer.firstName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="oe-page-top">
            <div className="one-event-image-container">
              <img
                className="event-image"
                alt={`${currentEvent.name}'s preview`}
                src={
                  currentEvent.EventImages.length > 0
                    ? `${currentEvent.EventImages[0].url}`
                    : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
                }
              />
            </div>
            <div className="right-side">
              <div className="one-event-group-details">
                <Link to={`/groups/${currentEvent.Group?.id}`}>
                  <img
                    className="one-event-group-img"
                    alt="event's group preview"
                    src={currentEvent.groupImg}
                  />
                </Link>
                <Link
                  to={`/groups/${currentEvent.Group?.id}`}
                  className="oe-group-info"
                >
                  <h4 className="name-group">{currentEvent.Group?.name}</h4>
                  <p className="pub-priv">
                    {currentEvent.private ? `Private Group` : `Public Group`}
                  </p>
                </Link>
              </div>
              <div className="one-event-description">
                <div className="event-specifics">
                  <div className="time-img-container">
                    <img
                      className="time-img"
                      alt="time icon"
                      src="https://secure.meetupstatic.com/next/images/design-system-icons/time-outline.svg"
                    />
                    <p className="date-times">
                      {`${dMD} at ${newStartDateTime.slice(
                        0,
                        -6
                      )} ${newStartDateTime.slice(-2)} to
                      ${eDMD} at ${newEndDateTime.slice(
                        0,
                        -6
                      )} ${newEndDateTime.slice(-2)} EST`}
                    </p>
                  </div>
                  <div className="event-type-container">
                    <img
                      className="type-img"
                      alt="type icon"
                      src={
                        currentEvent.type === "In person"
                          ? "https://secure.meetupstatic.com/next/images/design-system-icons/map-marker-outline.svg"
                          : "https://secure.meetupstatic.com/next/images/design-system-icons/video-outline.svg"
                      }
                    />
                    <p className="one-event-type">{currentEvent.type} Event</p>
                  </div>
                </div>
                {isOrganizer && (
                  <button
                    className="delete-event"
                    onClick={(e) => handleDelete(e, currentEvent.id)}
                  >
                    Delete Event
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="page-bottom">
            <div className="detail-div">
              <h2 className="detail-title">Details</h2>
              <p className="event-details">{currentEvent.description}</p>
              <h2 className="attendees">{`Attendees(${currentEvent.numAttending})`}</h2>
            </div>
          </div>
        </div>
        <div className="oe-attend-footer">
          <div className="left-attend-footer">
            <p>{`${footerEventStart.slice(0,1)}, ${footerEventStart.slice(1,2)} ${footerEventStart.slice(2,3)}`} &#x2022; {`${newStartDateTime.slice(0, -6)} ${newEndDateTime.slice(-2)} EST`}</p>
            <p><strong>{`${currentEvent.name}`}</strong></p>
          </div>
          <div className="right-attend-footer">
          {isAttendee(currentUser?.id) ?
            <button onClick={handleNoAttend} id='modal-btns' className="og-join-btn">
            Not attending
          </button>
            :
            <button onClick={handleAttend} id='modal-btns' className="og-join-btn">
              Attend this event
            </button>

          }
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading event details</h1>
  );
  return eventInfo;
}
