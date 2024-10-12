import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    
    // setShowMenu(!showMenu);
    console.log("TOGGLEMENU")
    setShowMenu((prevShowMenu) => !prevShowMenu);
    console.log("toggleMenu FUNCTION showMenu", showMenu)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      console.log("Click event triggered:", e.target);
      console.log("ulRef.current:", ulRef.current);
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        console.log("Closing menu");
        setShowMenu(false);
        console.log("CLOSEMENU USEEFFECT showMenu", showMenu)
      }
    };
    console.log("BEFORE EVENT")
    document.addEventListener('click', closeMenu);
    console.log("AFTER EVENT")
    return () => {
      console.log("Removing event listener");
      document.removeEventListener('click', closeMenu);
    }
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle onClick={toggleMenu} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li className='prof'>{user.username}</li>
        {/* <li>{user.firstName} {user.lastName}</li> */}
        <li className='prof'>{user.email}</li>
        <li className='prof-logout'>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;