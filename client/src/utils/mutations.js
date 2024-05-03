import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const CREATE_MOOD = gql`
  mutation CreateMood($name: String!) {
    createMood(name: $name) {
      id
      name
      description
    }
  }
`;

export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($title: String!, $iframeContent: String!, $description: String!, $userId: ObjectId!, $moodId: ObjectId!) {
    createPlaylist(title: $title, iframeContent: $iframeContent, description: $description, userId: $userId, moodId: $moodId) {
      id
      title
      iframeContent
      description
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

