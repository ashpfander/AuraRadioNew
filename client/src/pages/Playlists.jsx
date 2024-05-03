import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { CREATE_PLAYLIST } from '../utils/mutations';
import { GET_PLAYLISTS_BY_MOOD, GET_MOODS } from '../utils/queries';
import AuthService from '../utils/auth';

function Playlists() {
  const [title, setTitle] = useState('');
  const [iframeInput, setIframeInput] = useState('');
  const [description, setDescription] = useState('');
  const { moodId } = useParams();
  const userId = AuthService.getUserId();  
  const [moodName, setMoodName] = useState('');
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState('');

  const { loading: queryLoading, error: queryError, data } = useQuery(GET_PLAYLISTS_BY_MOOD, {
    variables: { moodId }
  });
  
  useEffect(() => {
    const getMoodName = async () => {
      try {
        const { data } = await client.query({
          query: GET_MOODS,
          variables: { moodId }
        });

        if (data && data.getMoods) {
          const currentMood = data.getMoods.find(mood => mood.id === moodId);
          if (currentMood) {
            const currentMoodName = currentMood.name;
            // console.log(currentMoodName);
            setMoodName(currentMoodName);
          }
        }
      } catch (error) {
        console.error('Error fetching mood name:', error);
      }
    };

    getMoodName();
  }, [moodId]);

  const [createPlaylist, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_PLAYLIST, {
    onCompleted: data => {
      console.log('Playlist created successfully:', data.createPlaylist);
      setIframeInput(''); 
      setTitle('');
      setDescription('');
    },
    update: (cache, { data: { createPlaylist } }) => {
      const existingPlaylists = cache.readQuery({
        query: GET_PLAYLISTS_BY_MOOD,
        variables: { moodId }
      });

      cache.writeQuery({
        query: GET_PLAYLISTS_BY_MOOD,
        variables: { moodId },
        data: {
          getPlaylistsByMood: [...existingPlaylists.getPlaylistsByMood, createPlaylist]
        }
      });
    },
    onError: (error) => {
      console.error('Error submitting the playlist:', error);
      if (error.graphQLErrors) console.error('GraphQL Errors:', error.graphQLErrors);
      if (error.networkError) console.error('Network Error:', error.networkError);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!userId) {
      console.error("User ID is undefined. User must be logged in to submit a playlist.");
      return; 
    }

    // Check if any of the input fields are empty
    if (title === '' || iframeInput === '' || description === '') {
      setErrorMessage('Some or all inputs are empty. Please fill out correctly.');
      return;
    }
  
    console.log("Submitting with data:", { title, iframeContent: iframeInput, description, userId, moodId });
  
    try {
      await createPlaylist({
        variables: {
          title,
          iframeContent: iframeInput,
          description,
          userId,
          moodId
        }
      });
    } catch (error) {
      console.error('Error submitting the playlist:', error);
      if (error.graphQLErrors) console.error('GraphQL Errors:', error.graphQLErrors);
      if (error.networkError) console.error('Network Error:', error.networkError);
    }
  };

  if (queryLoading) return <p>Loading playlists...</p>;
  if (queryError) return <p>Error loading playlists: {queryError.message}</p>;

  return (
    <div className="container">
      <div className="mt-5 d-flex justify-content-center">
        <div className="row">
          <h2 className="text-center">Drop a Vibe for {moodName}</h2>
          <form onSubmit={handleSubmit} className="col-12" noValidate>
            <input
            type="text"
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name It"
            required
            />
            <textarea
            className="form-control mb-3"
            value={iframeInput}
            onChange={(e) => setIframeInput(e.target.value)}
            placeholder="Paste the Magic here"
            required
            style={{ width: '100%', height: '100px' }}
            />
            <textarea
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paint the picture"
            required
            style={{ width: '100%', height: '50px' }}
            />
            <button type="submit" className="form-button p-3 mb-4" disabled={mutationLoading}>
            Send It to the Clouds
            </button>
            {mutationLoading && <p>Submitting...</p>}
            {mutationError && <p>Error submitting playlist: {mutationError.message}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </form>
          <div>
            <h3 className="text-center">Vibe Vault</h3>
            {data && data.getPlaylistsByMood.map((playlist, index) => (
            <div key={index}>
              <hr className="line"/>
              <h4>{playlist.title}</h4>
              <p>{playlist.description}</p>
              <div dangerouslySetInnerHTML={{ __html: playlist.iframeContent }} />
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
