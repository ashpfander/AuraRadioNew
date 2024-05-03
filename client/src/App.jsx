import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import './styles/index.css'
import Header from './components/header';
import { Navigate } from 'react-router-dom';
import AuthService from './utils/auth';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AuthService.getToken();
  console.log('Token from AuthService:', token); // Log the token being sent
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Logic to check if the user is authenticated
  const isAuthenticated = localStorage.getItem('id_token');

  return (
    <ApolloProvider client={client}>
      <Header />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
