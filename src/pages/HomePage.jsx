import React, { Component } from "react";
import axios from "axios";
import Country from "../components/CountryStat";
import Loading from "../components/Loading";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word_query: "",
      data: [],
      isLoading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.HightoLow = this.HightoLow.bind(this);
    this.LowtoHigh = this.LowtoHigh.bind(this);
    this.MostDeaths = this.MostDeaths.bind(this);
  }

  handleChange(event) {
    //updating the state based on UI input
    this.setState({ word_query: event.target.value });
  }

  handleSubmit(event) {
    //triggering a re-render after input
    console.log(`You have submitted ${this.state.word_query}`);
    this.componentDidMount();
    event.preventDefault();
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    if (this.state.word_query) {
      axios({
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/statistics",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "0007dada25msh9f1dc80e5f7b262p14929cjsna459a44c8270"
        },
        params: {
          country: `${this.state.word_query}`
        }
      })
        .then(response => {
          this.setState({ data: response.data.response, isLoading: false });
          //   console.log(this.state.data)
        })
        .catch(error => {
          console.log(error);
        });
    } else
      axios({
        method: "GET",
        url: "https://covid-193.p.rapidapi.com/statistics",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key": "0007dada25msh9f1dc80e5f7b262p14929cjsna459a44c8270"
        }
      })
        .then(response => {
          this.setState({ data: response.data.response, isLoading: false });
          // console.log(this.state.data);
        })
        .catch(error => {
          console.log(error);
        });
  }

  HightoLow() {
    const tempData = this.state.data;
    let tempSorted = tempData.sort((a, b) => {
      if (a.cases.active > b.cases.active) return -1;
      else return 1;
    });

    this.setState({ data: tempSorted });
  }

  LowtoHigh() {
    const tempData = this.state.data;
    let tempSorted = tempData.sort((a, b) => {
      if (a.cases.active > b.cases.active) return 1;
      else return -1;
    });

    this.setState({ data: tempSorted });
  }

  MostDeaths() {
    const tempData = this.state.data;
    let tempSorted = tempData.sort((a, b) => {
      if (a.deaths.total > b.deaths.total) return -1;
      else return 1;
    });

    this.setState({ data: tempSorted });
  }

  render() {
    if (this.state.isLoading)
      return (
        <div className="App-header">
          <Loading />
        </div>
      );
    return (
      <div>
        <div className="App-header container-fluid">
          <div className="col-lg-5 col-md-10 col-sm-8">
            <div className="form-group">
              <form onSubmit={this.handleSubmit}>
                <label className="header-text">Search by country</label>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.word_query}
                  onChange={this.handleChange}
                />
                <div className="row justify-content-start">
                  <input
                    className="col-4 btn btn-primary py-2 m-3"
                    type="submit"
                    value="Search"
                  />
                </div>
              </form>
            </div>
            <div className="col py-4">
              <button onClick={this.HightoLow} className="m-2 py-2 btn btn-warning">
                High to Low
              </button>
              <button onClick={this.LowtoHigh} className="m-2 py-2 btn btn-success">
                Low to High
              </button>
              <button onClick={this.MostDeaths} className="m-2 py-2 btn btn-danger">
                Most deaths
              </button>
            </div>
          </div>
          {this.state.data.map((e, key) => {
            return <Country id={key} key={key} stats={e} />;
          })}
        </div>
        <span className="text-muted">Made By: Siam</span>
        <br></br>
        <a target="_blank" href="https://github.com/siam132">
          Github
        </a>
      </div>
    );
  }
}

export default HomePage;
