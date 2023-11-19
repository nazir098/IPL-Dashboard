import React from "react";
import { Link } from "react-router-dom";
import "./SmallMatchDetailCard.css";

export const SmallMatchDetailCard = ({teamName, match}) => {

   const opponentTeam= match.team1===teamName?match.team2:match.team1;
   const otherTeamRoutes= `/teams/${opponentTeam}`;
   const matchWon = teamName===match.winner;
  return (
    <div className={matchWon ?'won-card SmallMatchDetailCard':'lost-card SmallMatchDetailCard'}> 
      <span>vs</span>
      <h3><Link to={otherTeamRoutes}> {opponentTeam} </Link></h3>
    <p className="match-result">{match.winner} won by {match.resultMargin} {match.result}</p>
    
    </div>
  );
};
