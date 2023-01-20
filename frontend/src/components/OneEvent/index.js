import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEvent } from "../../store/events";
import './OneEvent.css'


export default function OneEventPage () {
  const dispatch = useDispatch();
  const {eventId} = useParams();

  useEffect(() => {
    dispatch(getEvent(eventId))
  }, [dispatch, eventId])

  const currentEvent = useSelector(state => state.events.event);
  const currentGroup = useSelector(state => state.events.event.Group);
  const currentUser = useSelector((state) => state.session.user)

  let isOrganizer = false
  if (!currentEvent.EventImages) return;


  if (currentUser) {
    isOrganizer = currentGroup.organizerId === currentUser.id
  }
  console.log('look', currentEvent)

  const dMD = new Date(currentEvent.startDate).toDateString().split(' ')
  const eDMD = new Date(currentEvent.endDate).toDateString().split(' ')
  const newStartDateTime = new Date(currentEvent.startDate).toLocaleTimeString()
  const newEndDateTime = new Date(currentEvent.endDate).toLocaleTimeString()

  const eventInfo = currentEvent ? (
    <div className="one-event-container">
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
        <div className="name-info">
          <h2 className="one-event-name">{`${currentEvent.name}`}</h2>
          <p className="hoster-name">{`Hosted by ${currentEvent.Organizer.firstName}`}</p>
        </div>
        <div>
          <h2 className="detail-title">Details</h2>
          <p className="event-details">{currentEvent.description}</p>
          <h2>{`Attendees(${currentEvent.numAttending})`}</h2>
        </div>
        <div className="group-details">
          <h4>{currentGroup.name}</h4>
          <p>{currentGroup.private ? `Private Group` : `Public Group`}</p>
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
      </div>
      {isOrganizer && (
        <button>
          Delete Group
        </button>
      )}
    </div>
  ) : (<h1>Loading event details</h1>)
  return eventInfo
}
