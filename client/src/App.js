import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { AuthProvider } from "./utils/context"

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Nav from './components/Nav';
import Footer from './components/Footer';

import PlushiDetails from './pages/PlushiDetails';
import AllPlushies from './pages/AllPlushies';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Routes we still need:
//createPost
//viewPost
//Profile
//FriendList
function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div>
            <Nav />
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                path="/allplushies"
                element={<AllPlushies />}
              />
              <Route
                path="/products/:_id"
                element={<PlushiDetails />}
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
