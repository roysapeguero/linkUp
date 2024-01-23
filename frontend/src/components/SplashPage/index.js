import "./SplashPage.css";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "./SignupModal";

function SplashPage() {
  return (
    <div className="splash-page-container">
      <img
        className="red-blob"
        src="https://secure.meetupstatic.com/next/images/blobs/red-blob.svg"
        alt="red blob"
      />
      <img
        className="yellow-blob"
        src="https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg"
        alt="yellow blob"
      />
      <img
        className="green-blob"
        src="https://secure.meetupstatic.com/next/images/blobs/green-blob.svg"
        alt="green blob"
      />
      <div className="splash-page-content">
        <div className="page-left">
          <h1 className="page-title">
            The fake platform that makes fake planning simple
          </h1>
          <p className="page-description">
            Thousands of fake users make fake plans to link up based on fake
            intrests, time and 100% fake money. If you're looking for a fake way
            to make friends and have fun, look no further! Fake your next group
            event here!
          </p>
        </div>
        <div className="page-right">
          <img
            className="main-img"
            src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=1080"
            alt="meetup main"
          />
        </div>
      </div>
      <div className="feature-buttons">
        <NavLink className="link" to="/events">
          <img
            className="link-img"
            alt="make new friends"
            src="https://github.com/roysapeguero/linkUp/assets/110946315/19945abf-50e1-46db-8b62-8b73d1a4b107"
          />
          <button className="link-text">
            Make new friends
            <img
              alt="arrow"
              className="arrow-guy"
              src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48"
            />
          </button>
        </NavLink>
        <NavLink className="link" to="/events">
          <img
            className="link-img"
            alt="explore the outdoors"
            src="https://github.com/roysapeguero/linkUp/assets/110946315/2cd3f32f-90dd-4e7a-8aaf-b9590c297c11"
          />
          <button className="link-text">
            Explore the outdoors
            <img
              alt="arrow"
              className="arrow-guy"
              src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48"
            />
          </button>
        </NavLink>
        <NavLink className="link" to="/events">
          <img
            className="link-img"
            alt="connect over tech"
            src="https://github.com/roysapeguero/linkUp/assets/110946315/347e2cbb-8de0-41c2-8b6b-089427b6c1d5"
          />
          <button className="link-text">
            Connect over tech
            <img
              alt="arrow"
              className="arrow-guy"
              src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=48"
            />
          </button>
        </NavLink>
      </div>
      <div className="how-it-works">
        <h2 className="how-title">How LinkUp works</h2>
        <p className="how-text">
          Meet fake people who share your fake intrests through online and
          in-person events. It's free to create an account.
        </p>
        <div className="join-find-start">
          <div className="start-links">
            <img
              className="start-link-img"
              alt="join a group"
              src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=384"
            />
            <NavLink to="/groups">
              <button className="start-link-btn">Join a group</button>
            </NavLink>
            <p className="start-link-text">
              Do what you love, meet fake others who love it, find your fake
              community. The rest is history!
            </p>
          </div>
          <div className="start-links">
            <img
              className="start-link-img"
              alt="find an event"
              src="	https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=384"
            />
            <NavLink to="/events">
              <button className="start-link-btn">Find an event</button>
            </NavLink>
            <p className="start-link-text">
              Fake events are happening on just about any topic you can think
              of, from online gaming and photography to yoga and hiking.
            </p>
          </div>
          <div className="start-links">
            <img
              className="start-link-img"
              alt="start a group"
              src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=384"
            />
            <button className="start-group">
              <OpenModalButton
                buttonText="Sign up to start a group"
                modalComponent={<SignupFormModal />}
              />
            </button>
            <p className="start-link-text">
              You don't have to be an expert to gather fake people together and
              explore non-existent interests.
            </p>
          </div>
        </div>
      </div>
      <div className="join-div">
        <p className="join-btn">
          <OpenModalButton
            buttonText="Join LinkUp"
            modalComponent={<SignupFormModal />}
          />
        </p>
      </div>
      {/* <div className="footer">
        <h3 className="dev-info">Developer Information:</h3>
        <div className="contact-div">
          <button className="contact-btns">
            <a target='_blank' href="https://github.com/roysapeguero">
              <i class="fa-brands fa-github"></i>
            </a>
          </button>
          <button className="contact-btns">
            <a target='_blank' href="https://www.linkedin.com/in/roysapeguero/">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default SplashPage;
