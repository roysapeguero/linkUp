import "./HomePage.css"
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Groups from "../Groups";
import Events from "../Events";

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
    history.push('/groups')
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
    history.push('/events')
  }
}

  return (
    <div className="home-page-container">
      <div className="home-page-content">
        <div className="welcome-user">
          <p>{`Welcome, ${user.firstName} 👋`}</p>
        </div>
        <div className="toggle-area-container">
          <button className='events-btn' onClick={() => handleEventClick()}>
            Events
          </button>
          &#65372;
          <button className='groups-btn' onClick={() => handleGroupClick()}>
            Groups
          </button>
          {groupDisplay ? <Groups /> : null}
          {eventDisplay ? <Events /> : null}
        </div>
      </div>
    </div>
  )
}

export default HomePage;
