import { React } from "react";
import "./YearSelector.css";
import { Link } from "react-router-dom";

export const YearSelector = (teamName) => {
  let years = [];
  const startYear = process.env.REACT_APP_DATA_START_YEAR;
  const endYear = process.env.REACT_APP_DATA_END_YEAR;

  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return (
    <>
      <div className="MatchPage">
        <ol className="year-list">
          <h4 className="">Select Year</h4>
          {years.map((year) => (
            <Link to={`/teams/${teamName.teamName}/match/${year}`}>
              <ul>{year}</ul>
            </Link>
          ))}
        </ol>
      </div>
    </>
  );
};
