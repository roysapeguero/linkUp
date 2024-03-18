import { useHistory } from "react-router-dom";

export default function EventItem({ event }) {
  const history = useHistory();
  const dMD = new Date(event.startDate).toDateString().split(" ");
  const newStartDateTime = new Date(event.startDate).toLocaleTimeString();

  const handleAttendClick = (eventId) => {
    history.push(`/events/${eventId}`);
  };
  return (
    <div className="og-event-item-container">
      <div className="og-event-details-container">
        <p className="og-event-date">{`${dMD[0].toUpperCase()}, ${dMD[1].toUpperCase()} ${
          dMD[2]
        }, ${dMD[3]},
         ${newStartDateTime.slice(0, -6)} ${newStartDateTime.slice(-2)}`}</p>
        <h1 className="og-event-name">{event.name}</h1>
        <div className="og-event-type">
          <img
            className="type-img"
            alt="type icon"
            src={
              event.type === "In person"
                ? "https://secure.meetupstatic.com/next/images/design-system-icons/map-marker-outline.svg"
                : "https://secure.meetupstatic.com/next/images/design-system-icons/video-outline.svg"
            }
          />
          <p>{event.type} event</p>
        </div>
        <p className="og-event-description">{event.description}</p>
        <div className="og-event-attendee-details">
          {/* <div className="og-event-attendees">event attendee images</div> */}
          <div className="og-attendee-count">
            {event.numAttending > 1
              ? `${event.numAttending} attendees`
              : "1 attendant"}
          </div>
          <button
            onClick={() => handleAttendClick(event.id)}
            className="og-attend-button"
          >
            Attend
          </button>
        </div>
      </div>
    </div>
  );
}
