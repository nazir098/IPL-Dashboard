import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import "./MatchPage.css";
import { YearSelector } from "../components/YearSelector";

export const MatchPage = () => {
  const [match, setMatch] = useState([]);
  const { teamName, year } = useParams();
 
  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/match?year=${year}`
      );
      const data = await response.json();
    
      setMatch(data);
    };
    fetchMatches();
  }, [teamName, year]);

  if (!match) return <h1>teamName not Found</h1>;
  return (
    <div className="MatchPage">
      <YearSelector teamName={teamName}></YearSelector>
    
      <div>
        <h1>{teamName}  matches in {year}</h1>
        {
        match?.map((match) => (
          <>
            <MatchDetailCard teamName={teamName} match={match} />
          </>
        ))}
      </div>
    </div>
  );
};
