import React from 'react';
import { useQuery } from '@apollo/client';
import PlaylistHistory from "../components/PlaylistHistory";
import { GET_USER_PLAYLISTS } from '../utils/queries';

export default function YourPlaylist() {
  const { data, loading, error } = useQuery(GET_USER_PLAYLISTS);

// Display loading message while fetching playlist
  if (loading) return <p>Loading playlists...</p>;

  // Display loading message if there's an error fetching playlist
  if (error) return <p>Error loading playlists: {error.message}</p>;

// Render PlaylistHistory component with fetched playlists data
  return (
    <PlaylistHistory playlists={data.getUserPlaylists} />
  );
}