import { useSelector } from "react-redux";

export default function AttendeeItem({ attendee, event }) {
  const groupOrgId = useSelector(
    (state) => state.events.event.Group.Organizer.id
  );
  return (
    <div className="oe-attendee-item-container">
      <div className="attendee-image-container">
        <div className="nav-user event-attendee">{attendee.firstName[0]}</div>
      </div>
      <div className="attendee-name-status">
        <p className="attendee-name">{`${attendee.firstName} ${attendee.lastName[0]}.`}</p>
        {groupOrgId === attendee.id ? (
          <p className="attendee-title">Event Organizer</p>
        ) : (
          <p className="attendee-title">Member</p>
        )}
      </div>
    </div>
  );
}
