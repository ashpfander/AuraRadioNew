import { Link, useLocation } from 'react-router-dom';
import Auth from '../utils/auth';

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

function Navbar() {
  const currentPage = useLocation().pathname;

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/moods"
          className={currentPage === '/moods' ? 'nav-link active' : 'nav-link'}>
          Moods
        </Link>
      </li>
      {/* if user is logged in show your playlists and logout */}
      {Auth.isLoggedIn() ? (
        <>
        <li className="nav-item">
        <Link to="/yourPlaylist"
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
          className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}>
          Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup"
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