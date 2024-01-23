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
            src="https://private-user-images.githubusercontent.com/110946315/298690023-19945abf-50e1-46db-8b62-8b73d1a4b107.jpeg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU5NzIyNzAsIm5iZiI6MTcwNTk3MTk3MCwicGF0aCI6Ii8xMTA5NDYzMTUvMjk4NjkwMDIzLTE5OTQ1YWJmLTUwZTEtNDZkYi04YjYyLThiNzNkMWE0YjEwNy5qcGVnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDEyMyUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDAxMjNUMDEwNjEwWiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9MTRkMWU1YTRkYjMxNDlkNTI3OTUzNTA3NmJiMTQxNGVkY2U4Njg5YTQ0NWQzN2ZjZWIyNzI2YTg1NTAzYWIwMSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ._4OCFNPy9q3qwn0pMS4ajf_9pRtmINqfe2pcTYAw4bU"
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
            src="https://private-user-images.githubusercontent.com/110946315/298690159-2cd3f32f-90dd-4e7a-8aaf-b9590c297c11.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU5NzIyNzAsIm5iZiI6MTcwNTk3MTk3MCwicGF0aCI6Ii8xMTA5NDYzMTUvMjk4NjkwMTU5LTJjZDNmMzJmLTkwZGQtNGU3YS04YWFmLWI5NTkwYzI5N2MxMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMTIzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDEyM1QwMTA2MTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02MmE4NjQ2MWU0ZTA5MDgzNmQ4MmEwOWZjNTg3MDFkMTY1NzUxZGUwODc2ZTdlOGYxNTY5YjNkNWUxYjk2NDRjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.3U0QMbIIZFW0HCX5ZVbCwD1Rum8j54RuYGOmoXneDDc"
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
            src="https://private-user-images.githubusercontent.com/110946315/298690159-2cd3f32f-90dd-4e7a-8aaf-b9590c297c11.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDU5NzIyNzAsIm5iZiI6MTcwNTk3MTk3MCwicGF0aCI6Ii8xMTA5NDYzMTUvMjk4NjkwMTU5LTJjZDNmMzJmLTkwZGQtNGU3YS04YWFmLWI5NTkwYzI5N2MxMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwMTIzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDEyM1QwMTA2MTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02MmE4NjQ2MWU0ZTA5MDgzNmQ4MmEwOWZjNTg3MDFkMTY1NzUxZGUwODc2ZTdlOGYxNTY5YjNkNWUxYjk2NDRjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.3U0QMbIIZFW0HCX5ZVbCwD1Rum8j54RuYGOmoXneDDc"
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
