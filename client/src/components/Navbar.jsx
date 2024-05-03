import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

// We declare an object called styles that will contain a few objects for card and heading styles
// Notice that each key lists CSS styles in camel case
const styles = {
  card: {
    margin: 20,
    background: '#e8eaf6',
  },
  heading: {
    background: '#9a74db',
    minHeight: 50,
    lineHeight: 3.5,
    fontSize: '1.2rem',
    color: 'white',
    padding: '0 20px',
  },
};

// In Navbar, we can assign a style from an object by using curly braces
function Navbar() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/moods"
          // This is a conditional (ternary) operator that checks to see if the current page is "Moods"
          // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
          className={currentPage === '/moods' ? 'nav-link active' : 'nav-link'}>
          Moods
        </Link>
      </li>
      {/* if user is logged in show your playlists and logout */}
      {Auth.isLoggedIn() ? (
        <>
        <li className="nav-item">
        <Link to="/yourPlaylist"
        // Check to see if the currentPage is `Your Playlists`, and if so we use the active link class. Otherwise, we set it to a regular link class.
        className={currentPage === '/yourPlaylist' ? 'nav-link active' : 'nav-link'}>
          Your Playlist History
        </Link>
        </li>
        <li className="nav-item">
        <Link onClick={Auth.logout} className="nav-link">Logout</Link>
        </li>
        </>
      ) : (
        <>
        <li className="nav-item">
          <Link to="/login"
          // Check to see if the currentPage is `Login`, and if so we use the active link class. Otherwise, we set it to a regular link class.
          className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>
          Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup"
          // Check to see if the currentPage is `Sign Up`, and if so we use the active link class. Otherwise, we set it to a regular link class.
          className={currentPage === '/signup' ? 'nav-link active' : 'nav-link'}>
          Sign Up
          </Link>
        </li>
        </>
      )}
    </ul>
  );
}

export default Navbar;