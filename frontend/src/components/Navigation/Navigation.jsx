import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal';
import SignupFormModal from '../SignupFormPage/SignupFormPage';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        <ProfileButton className="profile-button" user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className='login-signup-container'>
          <OpenModalButton
            className='login-signup-buttons'
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
          <OpenModalButton
            className='login-signup-buttons'
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className='navigation-container'>
        <div className='nav-links'>
          <NavLink className="nav-text bounties" to="/">Bounties</NavLink>
          <NavLink className="nav-text leaderboards" to="/leaderboards">Leaderboards</NavLink>
        </div>

        {isLoaded && sessionLinks}

      </div>
      <hr className='line-break' ></hr>
    </>
  );
}

export default Navigation;