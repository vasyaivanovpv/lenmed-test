import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql/config';

import MatchesContainer from './containers/MatchesContainer';

import './App.css';

const App = () => (
  <ApolloProvider client={client}>
    <div className="App-root">
      <div className="App-container">
        <h1>Matches</h1>
        <div className="Matches-container">
          <table>
            <colgroup>
              <col />
              <col span="2" />
              <col />
              <col span="2" />
            </colgroup>
            <thead>
              <tr>
                <th>Status</th>
                <th colSpan="2">Team 1</th>
                <th>Score</th>
                <th colSpan="2">Team 2</th>
              </tr>
            </thead>
            <tbody>
              <MatchesContainer />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </ApolloProvider>
);

export default App;
