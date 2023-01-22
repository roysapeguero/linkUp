import "./HomePage.css"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Groups from "../Groups/Groups";
import Events from "../Events/Events";

function HomePage() {
  const user = useSelector((state) => state.session.user)
  const [groupDisplay, setGroupDisplay] = useState(false);
  const [eventDisplay, setEventDisplay] = useState(true);
  const history = useHistory()


const handleGroupClick = () => {
  if (groupDisplay === false && eventDisplay === true) {
    setGroupDisplay(true)
    setEventDisplay(false)
    history.push('/groups')
  }
  else if (groupDisplay === true && eventDisplay === false) {
    setGroupDisplay(true)
  }
}

const handleEventClick = () => {
  if (eventDisplay === false && groupDisplay === true) {
    setEventDisplay(true)
    setGroupDisplay(false)
    history.push('/events')
  }
  else if (eventDisplay === true && groupDisplay === false) {
    setEventDisplay(true)
  }
}

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="welcome-user">
          <p>{`Welcome, ${user.firstName} 👋`}</p>
        </div>
        <div className="toggle-area-container">
          <button className={`${eventDisplay ? 'selected-header' : 'unselected-header'}`} onClick={() => handleEventClick()}>
            Events
          </button>
          <button className={`${groupDisplay ? 'selected-header' : 'unselected-header'}`} onClick={() => handleGroupClick()}>
            Groups
          </button>
        </div>
          {groupDisplay ? <Groups /> : null}
          {eventDisplay ? <Events /> : null}
      </div>
    </div>
  )
}

export default HomePage;
