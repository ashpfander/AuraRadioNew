import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import Moods from './pages/Moods.jsx';
import Playlists from './pages/Playlists.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import YourPlaylist from './pages/YourPlaylist.jsx';
import Home from './pages/Home.jsx';
import AuthService from './utils/auth'; // Import AuthService

// Function to check if user is authenticated
const requireAuth = () => {
  return AuthService.isLoggedIn() ? <Moods /> : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginForm onLoginSuccess={AuthService.handleLoginSuccess} />, // Pass onLoginSuccess prop
      },
      {
        path: '/signup',
        element: <SignUpForm onSignUpSuccess={AuthService.handleSignUpSuccess} />, // Pass onSignUpSuccess prop
      },
      {
        path: '/moods',
        element: requireAuth(),
      },
      {
        path: '/:moodId/playlists',
        element: <Playlists />,
      },
      {
        path: '/yourPlaylist',
        element: <YourPlaylist />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
