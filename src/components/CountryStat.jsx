import React from "react";

const Country = props => {
  const activeCase = props.stats.cases.active;
  const alertStatus = AlertStatusCard(activeCase);
  const alertStatusDeath = AlertStatusDeathBadge(props.stats.deaths.new);
  const newDeath = props.stats.deaths.new ? props.stats.deaths.new : "N/A";
  const country = props.stats.country === "All" ? "World" : props.stats.country;

  return (
    <div className={`container shadow alert alert-${alertStatus} mx-2 px-5`}>
      <div className="row">
        <div className="row ">
          <h2 className=" col">
            <span className="shadow badge badge-secondary">{country}</span>
          </h2>
        </div>
        <div className="col">
          <h3>
            Active Cases:{" "}
            <span className={`${alertStatus}`}>{props.stats.cases.active}</span>
          </h3>
          <h4>Critical: {props.stats.cases.critical}</h4>
          <h4>Recovered: {props.stats.cases.critical}</h4>
          <h4>Total: {props.stats.cases.total}</h4>
        </div>
        <div className="col ">
          <h3>Total Deaths: {props.stats.deaths.total}</h3>
          <h4>
            New deaths:
            <span className={`${alertStatusDeath}`}> {newDeath}</span>
          </h4>
        </div>
      </div>
      <p className="date">Last updated: {props.stats.day}</p>
    </div>
  );
};

function AlertStatusCard(activeCase) {
  if (activeCase < 4000) return "success";
  else if (activeCase > 4000 && activeCase < 10000) return "warning";
  else return "danger";
}

function AlertStatusDeathBadge(newDeaths) {
  if (newDeaths < 100) return "badge badge-success";
  else if (newDeaths > 400 && newDeaths < 500) return "badge badge-warning";
  else return "badge badge-danger";
}

export default Country;
