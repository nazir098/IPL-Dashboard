import React from "react";
import { Link } from "react-router-dom";
import "./MatchDetailCard.css";
export const MatchDetailCard = ({ teamName, match }) => {
  const opponentTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoutes = `/teams/${opponentTeam}`;
  const matchWon = teamName===match.winner;
  return (
    <div className={matchWon ?'won-card MatchDetailCard':'lost-card MatchDetailCard'} >
      <div>
        <span>vs</span>
        <h3>
          <Link to={otherTeamRoutes}> {opponentTeam} </Link>
        </h3>
        <h3 className="match-date">{match.date}</h3>
        <h3 className="match-venue">{match.venue}</h3>
        <h3 className="match-result">
          {match.matchWinner} won by {match.resultMargin} {match.result}
        </h3>
      </div>
      <div className="additional-details">
        <h3>first innings</h3>
        <p>{match.team1}</p>
        <h3>second innings</h3>
        <p>{match.team2}</p>
        <h3>Man of the match</h3>
        <p>{match.playerOfMatch}</p>
        <h3>Umpires</h3>
        <p>{match.umpire1} , {match.umpire2}</p>
      </div>
    </div>
  );
};
