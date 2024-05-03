import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
    }
  }
`;

export const GET_MOODS = gql`
  query GetMoods {
    getMoods {
      id
      name
      description
    }
  }
`;

export const GET_PLAYLISTS_BY_MOOD = gql`
  query GetPlaylistsByMood($moodId: ObjectId!) {
    getPlaylistsByMood(moodId: $moodId) {
      id
      title
      iframeContent
      description
      user {
        id
        username
      }
    }
  }
`;

export const GET_PLAYLISTS = gql`
  query GetPlaylists {
    getPlaylists {
      id
      title
      iframeContent
      description
      mood {
        id
        name
      }
    }
  }
`;
