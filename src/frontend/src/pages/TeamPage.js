import { React, useEffect, useState } from "react";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { SmallMatchDetailCard } from "../components/SmallMatchDetailCard";
import { useParams, Link } from "react-router-dom";
import "./TeamPage.css";
import { PieChart } from "react-minimal-pie-chart";

export const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const { teamName } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`);
      const data = await response.json();
      setTeam(data);
    };
    fetchMatches();
  }, [teamName]);

  if (!team || !team.teamName) return <h1>teamName not Found</h1>;

  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>

      <div className="win-loss-section">
        Wins/Losses
        <PieChart
          data={[
            {
              title: "Losses",
              value: team.totalMatches - team.totalWins,
              color: "red",
            },
            { title: "Wins", value: team.totalWins, color: "green" },
          ]}
        />
      </div>

      <div className="math-detail-section">
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      <div className="small-detail-card">
        {team.matches.slice(1)?.map((match) => (

            <SmallMatchDetailCard key={match.id} teamName={team.teamName} match={match} />
          
        ))}
        <div className="more-link">
          <Link
            to={`/teams/${team.teamName}/match/${process.env.REACT_APP_DATA_END_YEAR}`}
          >
              more&gt; 
          </Link>
        </div>
      </div>
    </div>
  );
};
