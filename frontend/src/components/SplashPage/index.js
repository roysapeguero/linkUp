import "./SplashPage.css"

function SplashPage() {
  return (
    <div className="splash-page-container">
      <div className="splash-page-content">
        <img className="red-blob" src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg" alt='red blob' />
        <img className="yellow-blob" src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg" alt='yellow blob' />
        <img className="green-blob" src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg" alt='green blob' />
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
        <button id="btns1">All Groups</button>
        <button id="btns2">All Events</button>
      </div>
    </div>
  )
}

export default SplashPage;
