
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logoo from '../images/logoo.png';
function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li className ="siteLogo">
      <NavLink to="/"className = "logo"><img className = "logo" src = {logoo} alt=""/></NavLink>
      <span className="logo-text">Destiny Lodgings</span>
      </li>
      {isLoaded && (
        <>
       
        {sessionUser && (
            <li>
              <NavLink to="/create-spot" className="create-spot-link">
                Create a New Spot
              </NavLink>
            </li>
      )}
       <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
      )}
    </ul>
  );
}

export default Navigation;