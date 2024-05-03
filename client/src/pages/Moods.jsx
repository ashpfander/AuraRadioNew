import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MOODS } from '../utils/queries';

function Moods() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_MOODS);

  const handleMoodClick = (moodId) => {
    navigate(`/${moodId}/playlists`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const getRandomColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return randomColor;
  };

  return (
    <div className="container-fluid text-center p-5">
      <h2 className="mb-3">Select a Playlist for your Mood!</h2>
      <div className="row">
        {data.getMoods.map(mood => (
          <div className="list-group col-6 mb-3" key={mood.id}>
          <button
            className="moods list-group-item pt-4 pb-3"
            style={{ backgroundColor: getRandomColor() }}
            onClick={() => handleMoodClick(mood.id)}
          >
            <h3>{mood.name}</h3>
            <p>{mood.description}</p>
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Moods;


