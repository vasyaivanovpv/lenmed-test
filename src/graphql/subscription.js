import gql from 'graphql-tag';

export const ADD_MATCHES_SUBSCRIPTION = gql`
  subscription {
    matchAdded {
      id
      teams {
        name
        logo
      }
      result_score
      cards
      status
      is_live
      is_finished
      minute
    }
  }
`;

export const REMOVE_MATCHES_SUBCRIPTION = gql`
  subscription {
    matchRemoved {
      id
    }
  }
`;

export const CHANGED_MATCHES_SUBCRIPTION = gql`
  subscription {
    matchChanged {
      id
      result_score
      cards
      status
      is_live
      is_finished
      minute
    }
  }
`;
