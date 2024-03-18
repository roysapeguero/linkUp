export default function EventItem({ event }) {
  const dMD = new Date(event.startDate).toDateString().split(" ");
  const newStartDateTime = new Date(event.startDate).toLocaleTimeString();
  return (
    <div className="og-event-item-container">
      <div className="og-event-details-container">
        <p className="og-event-date">{`${dMD[0].toUpperCase()}, ${dMD[1].toUpperCase()} ${
          dMD[2]
        }, ${dMD[3]},
         ${newStartDateTime.slice(0, -6)} ${newStartDateTime.slice(-2)}`}</p>
        <h1 className="og-event-name">{event.name}</h1>
        <p className="og-event-type">{event.type}</p>
        <p className="og-event-description">{event.description}</p>
        <div className="og-event-attendee-details">
          {/* <div className="og-event-attendees">event attendee images</div> */}
          <div className="og-attendee-count">
            {event.numAttending > 1
              ? `${event.numAttending} attendees`
              : "1 attendant"}
          </div>
          <button>attend</button>
        </div>
      </div>
    </div>
  );
}
