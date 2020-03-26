import React, { useEffect } from 'react';

const Matches = ({ subcribeMathes, ...result }) => {
  const { loading, error, data } = result;

  useEffect(() => {
    subcribeMathes();
  }, []);

  if (loading)
    return (
      <tr>
        <td colSpan="6">Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td colSpan="6">Oops, error!</td>
      </tr>
    );

  const setScore = (score) => {
    if (score) return score;
    return `-:-`;
  };

  const setCards = (cardsCount) => {
    let cards = [];
    for (let i = 0; i < cardsCount; i++) {
      cards.push(<span className="Card-root" key={i}></span>);
    }
    return <span className="Cards-root">{cards}</span>;
  };

  return data.feed.map((match, i) => (
    <tr key={i} className={match.is_live ? 'Match-isLive' : ''}>
      <td>{match.status}</td>
      <td>
        {match.cards && <span>{setCards(match.cards[0])}</span>}
        {match.teams[0].name}
      </td>
      <td>
        <img src={match.teams[0].logo} alt="teamlogo" />
      </td>
      <td>{setScore(match.result_score)}</td>
      <td>
        <img src={match.teams[1].logo} alt="teamlogo" />
      </td>
      <td>
        {match.teams[1].name}
        {match.cards && <span>{setCards(match.cards[0])}</span>}
      </td>
    </tr>
  ));
};

export default Matches;
