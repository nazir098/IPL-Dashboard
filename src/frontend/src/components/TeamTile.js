
import "./TeamTile.css";
import { Link } from "react-router-dom";
export const TeamTile = ({ teamName }) => {

  return (
    <>
    <div className="TeamTile">
      <h3 className="name-team">
        
        <Link to={`/teams/${teamName}`}> {teamName}</Link>
      </h3>
    </div>
    </>
  );
};
