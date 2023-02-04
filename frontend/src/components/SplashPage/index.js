import "./SplashPage.css"
import { NavLink } from "react-router-dom";

function SplashPage() {
  return (
    <div className="splash-page-container">
        <img className="red-blob" src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg" alt='red blob' />
        <img className="yellow-blob" src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg" alt='yellow blob' />
        <img className="green-blob" src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg" alt='green blob' />
      <div className="splash-page-content">
        <div className="page-left">
          <h1 className="page-title">The fake platform that makes fake planning simple</h1>
          <p className="page-description">
            Thousands of fake users make fake plans to link up based on fake intrests,
            time and 100% fake money. Fake your next group event here!
          </p>
        </div>
        <div className="page-right">
          <img className="main-img" src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080" alt='meetup main' />
        </div>
      </div>
      <div className="feature-buttons">
        <NavLink className="link" to='/events'>
          <img className="link-img" alt='make new friends' src='https://secure.meetupstatic.com/next/images/indexPage/category1.webp?w=3840' />
          <button className="link-text">
            Make new friends
            <img className="arrow-guy" src='https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48'/>
          </button>
        </NavLink>
        <NavLink className="link" to='/events'>
          <img className="link-img" alt='explore the outdoors' src='https://secure.meetupstatic.com/next/images/indexPage/category2.webp?w=3840' />
          <button className="link-text">
            Explore the outdoors
            <img className="arrow-guy" src='https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48'/>
          </button>
        </NavLink>
        <NavLink className="link" to='/events'>
          <img className="link-img" alt='connect over tech' src='https://secure.meetupstatic.com/next/images/indexPage/category3.webp?w=2048' />
          <button className="link-text">
            Connect over tech
            <img className="arrow-guy" src='https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48'/>
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default SplashPage;
