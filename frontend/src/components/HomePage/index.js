import "./HomePage.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Groups from "../Groups";

// import Groups from "../Groups";


function HomePage() {
  const user = useSelector((state) => state.session.user)
  const [groupDisplay, setGroupDisplay] = useState(true);

  const handleClick = () => {

    setGroupDisplay(!groupDisplay)
  }

  return (
    <div className="home-page-container">

      <div className="home-page-content">
        <div className="welcome-user">
          <p>{`Welcome, ${user.firstName} 👋`}</p>
        </div>
        <div className="toggle-area-container">
          <button onClick={() => handleClick()}>
            Groups
          </button>
            {groupDisplay ? <Groups /> : null}
        </div>
      </div>
    </div>
  )
}

export default HomePage;
