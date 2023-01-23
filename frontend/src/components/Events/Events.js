import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getEvents } from '../../store/events.js';
import './Events.css';

const Events = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.session.user)
  const eventsObj = useSelector(state => state.events.allEvents)
  const events = Object.values(eventsObj)

  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getEvents()).then(() =>{
      setIsLoaded(true)
    })
  }, [dispatch])

  const handleEventClick = (eventId) => {
    history.push(`/events/${eventId}`)
  }

  if (!events.length) return null

  const eventInfo = events.map((event) => {
    const dMD = new Date(event.startDate).toDateString().split(' ')
    const newStartDateTime = new Date(event.startDate).toLocaleTimeString()
    if (event.numAttending === 0) event.numAttending = 1
    return (
      <div onClick={() => handleEventClick(event.id)} key = {event.id} className="event-container">
        <hr />
        <div className='img-container'>
          <img
            className='preview-img'
            src={event.previewImage === 'No images yet' ?
              "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
              : event.previewImage}
            alt={`${event.name}'s preview`}
          />
        </div>
        <div className='events-description'>
          <p className='event-name'>{event.name}</p>
          <p className='event-dates'>{`${dMD[0].toUpperCase()}, ${dMD[1].toUpperCase()} ${dMD[2]} - ${newStartDateTime.slice(0, -6)} ${newStartDateTime.slice(-2)}`}</p>
        </div>
        <div>
          <p className='event-group-name-location'> {`${event.Group?.name}`} &#x2022; {`${event.Group?.city}, ${event.Group?.state}`}</p>
          <p className='event-info-members'>{`${event.numAttending} ${event.numAttending > 1 ? "attendees" : "attendant"} `}</p>
          <p className='event-type'>{`${event.type} Event`}</p>
        </div>
      </div>
      );
    })

  return (
    <div className="event-list-container">
      {!user ? <Link to='/'><button className='back-btn'>&laquo; Back</button></Link> : null}
      {!user ? <div className='not-logged-in'>{eventInfo}</div> : eventInfo}
    </div>
  )
};

export default Events;
