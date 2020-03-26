import gql from 'graphql-tag';

export const MATCHES_QUERY = gql`
  query {
    feed {
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
