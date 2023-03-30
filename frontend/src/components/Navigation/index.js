import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../SplashPage/LoginModal';
import SignupFormModal from '../SplashPage/SignupModal';
import './Navigation.css';
import CreateGroupModal from '../Groups/CreateGroup';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <OpenModalButton
          buttonText="Start a new group - 100% off!"
          modalComponent={<CreateGroupModal />} />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div>
        {/* <button className="contact-btns">
          <a target='_blank' href="https://github.com/roysapeguero">
            <i class="fa-brands fa-github"></i>
          </a>
        </button>
        <button className="contact-btns">
          <a target='_blank' href="https://www.linkedin.com/in/roysapeguero/">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
        </button> */}
        <OpenModalButton
          buttonText="Log in"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className='nav-bar'>

      <div className='nav-bar-left'>
        <NavLink exact to="/"><img alt='' className='home-logo' src='https://see.fontimg.com/api/renderfont4/dEqR/eyJyIjoiZnMiLCJoIjoxMDIsInciOjIwMDAsImZzIjo1MSwiZmdjIjoiI0Y2NTg1OCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/bGlua1Vw/lemon-jelly-personal-use.png' /></NavLink>
      </div>
      <div className='nav-bar-right'>
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
        <div className='logged-in-drop-down'>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
