import React from "react";
import { Bar } from "react-chartjs-2";

const Charts = props => {
  let country = [];
  let death = [];

  const tempData = props.stats;
  let tempSorted = tempData.sort((a, b) => {
    if (a.cases.active > b.cases.active) return -1;
    else return 1;
  });

  for (let i = 1; i < 10; i++) {
    country.push(tempSorted[i].country);
    death.push(tempSorted[i].cases.active);
  }
  const state = {
    labels: country,
    datasets: [
      {
        backgroundColor: "rgb(255, 107, 97)",
        borderColor: "rgb(255, 255, 255)",
        borderWidth: 1,
        data: death
      }
    ]
  };

  return (
    <div className="container-fluid App-header">
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Active Cases of top 10 Countries",
            fontSize: 20
          },
          legend: {
            display: false
          },
          
        }}
        height={120}
      />
    </div>
  );
};

export default Charts;
