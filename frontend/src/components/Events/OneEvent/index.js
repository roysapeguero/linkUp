import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteEventThunk, getEvent } from "../../../store/events";
import './OneEvent.css'


export default function OneEventPage () {
  const dispatch = useDispatch();
  const {eventId} = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getEvent(eventId))
  }, [dispatch, eventId])

  const handleDelete = async (e, eventId) => {
    e.preventDefault();
    const response = await dispatch(deleteEventThunk(eventId))
    if (response.message === "Successfully deleted") {
      history.push('/events')
    }
  }

  const currentEvent = useSelector(state => state.events.event);
  // const currentGroup = useSelector(state => state.groups.group)
  const currentUser = useSelector((state) => state.session.user)

  let isOrganizer = false
  if (!currentEvent.EventImages) return;

  if (currentUser) {
    isOrganizer = currentEvent.Group.organizerId === currentUser.id
  }

  if (currentEvent.numAttending === 0) currentEvent.numAttending = 1

  const dMD = new Date(currentEvent.startDate).toDateString().split(' ')
  const eDMD = new Date(currentEvent.endDate).toDateString().split(' ')
  const newStartDateTime = new Date(currentEvent.startDate).toLocaleTimeString()
  const newEndDateTime = new Date(currentEvent.endDate).toLocaleTimeString()

  const eventInfo = currentEvent ? (
    <div className="one-event-container">
      <div className="name-info">
        <h1 className="one-event-group-name">{`${currentEvent.name}`}</h1>
        <p className="hosted">Hosted By </p>
        <p className="hoster-name">{currentEvent.Group.Organizer.firstName}</p>
      </div>
      <div className="content">
        <div className="image-container">
          <img
            className="event-image"
            alt={`${currentEvent.name}'s preview`}
            src={currentEvent.EventImages.length > 0 ?
              `${currentEvent.EventImages[0].url}`
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
            }
          />
        </div>
        <div className="one-event-decription">
          <div className="group-details">
            <h4 className="name-group">{currentEvent.Group?.name}</h4>
            <p className="pub-priv">{currentEvent.private ? `Private Group` : `Public Group`}</p>
          </div>
          <div className="event-specifics">
            <p className="date-times">
              {`${dMD[0]}, ${dMD[1]} ${dMD[2]} ${dMD[3]} at ${newStartDateTime.slice(0, -6)} ${newStartDateTime.slice(-2)}
                to ${eDMD[0]}, ${eDMD[1]} ${eDMD[2]} ${eDMD[3]} at ${newEndDateTime.slice(0, -6)} ${newEndDateTime.slice(-2)}
                EST
              `}
            </p>
            <p className="one-event-type">{currentEvent.type}</p>
          </div>
          <div>
            <h2 className="detail-title">Details</h2>
            <p className="event-details">{currentEvent.description}</p>
            <h2>{`Attendees(${currentEvent.numAttending})`}</h2>
          </div>
        </div>
        {isOrganizer && (
          <button onClick={(e) => handleDelete(e, currentEvent.id)}>
            Delete Event
          </button>
        )}
      </div>
    </div>
  ) : (<h1>Loading event details</h1>)
  return eventInfo
}
