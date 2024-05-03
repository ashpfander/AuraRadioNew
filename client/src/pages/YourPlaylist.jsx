import React from 'react';
import { useQuery } from '@apollo/client';
import PlaylistHistory from "../components/PlaylistHistory";
import { GET_USER_PLAYLISTS } from '../utils/queries';

export default function YourPlaylist() {
  const { data, loading, error } = useQuery(GET_USER_PLAYLISTS);

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error loading playlists: {error.message}</p>;

  return (
    <PlaylistHistory playlists={data.getUserPlaylists} />
  );
}