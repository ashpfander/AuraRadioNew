import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();


  useEffect(() => {
    const getBackgroundColor = () => {
      if (location.pathname === '/') {
        document.body.style.backgroundColor = '#9119c9'; 
      } else {
        document.body.style.backgroundColor = 'white'; 
      }
    };

    getBackgroundColor();

    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, [location]);

  return (
    <div className="container">
      <div className="home text-center p-5">
        <h2>Playlists that'll put you in a mood.</h2>
        <a href="/moods">
          <button className="p-3 mt-3 home-button">Explore Moods</button>
        </a>
      </div>
    </div>
  );
}

export default Home;