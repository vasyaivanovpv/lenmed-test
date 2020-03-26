import React, { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { MATCHES_QUERY } from '../graphql/query';
import {
  ADD_MATCHES_SUBSCRIPTION,
  REMOVE_MATCHES_SUBCRIPTION,
  CHANGED_MATCHES_SUBCRIPTION,
} from '../graphql/subscription';

import Matches from '../components/Matches';

const MatchesContainer = () => {
  const { subscribeToMore, ...result } = useQuery(MATCHES_QUERY);

  const subcribeMathes = useCallback(() => {
    subscribeToMore({
      document: ADD_MATCHES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMatch = subscriptionData.data.matchAdded;
        return { feed: [...prev.feed, newMatch] };
      },
    });
    subscribeToMore({
      document: REMOVE_MATCHES_SUBCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMatch = subscriptionData.data.matchRemoved;
        return {
          feed: [...prev.feed.filter((match) => match.id !== newMatch.id)],
        };
      },
    });
    subscribeToMore({
      document: CHANGED_MATCHES_SUBCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const newMatch = subscriptionData.data.matchChanged;
        return {
          feed: [
            ...prev.feed.map((match) => {
              if (match.id !== newMatch.id) return match;
              return {
                ...match,
                result_score: newMatch.result_score,
                cards: newMatch.cards,
                status: newMatch.status,
                is_live: newMatch.is_live,
                is_finished: newMatch.is_finished,
                minute: newMatch.minute,
              };
            }),
          ],
        };
      },
    });
  }, [result.data]);

  return <Matches {...result} subcribeMathes={subcribeMathes} />;
};

export default MatchesContainer;
