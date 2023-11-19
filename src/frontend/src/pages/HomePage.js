import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HomePage.css";
import { TeamTile } from "../components/TeamTile";
export const HomePage = () => {
  const [team, setTeam] = useState([]);
  const { teamName } = useParams();

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
      const data = await response.json();
    
      setTeam(data);
    };
    fetchTeams();
  }, [teamName]);

  if (!team) return <h1>No team is Found</h1>;
  
  return (
    <div className="HomePage">
      <h1>IPL Dashboard</h1>

      <div className="team-names">
        {team.map((teams) => (
          <div className="team-item">
           
            <TeamTile key={teams.id} teamName={teams.teamName}/>
          </div>
        ))}
      </div>
    </div>
  );
};
