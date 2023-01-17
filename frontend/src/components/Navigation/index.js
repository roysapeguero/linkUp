import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <div>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </div>
    );
  }

  return (
    <div className='nav-bar'>
      <div className='nav-bar-left'>
        <NavLink exact to="/"><img className='home-logo' src='https://see.fontimg.com/api/renderfont4/dEqR/eyJyIjoiZnMiLCJoIjoxMDIsInciOjIwMDAsImZzIjo1MSwiZmdjIjoiI0Y2NTg1OCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/bGlua1Vw/lemon-jelly-personal-use.png' alt='personal logo' /></NavLink>
      </div>
      <div className='nav-bar-right'>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
