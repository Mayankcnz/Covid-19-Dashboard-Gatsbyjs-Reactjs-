import React from "react";
import { Grid } from "@material-ui/core";
import { Cards, CountryPicker, Chart, PieChart } from "components";
import styles from "../Cards/Cards.module.css";
import { fetchData, fetchContinent, fetchCountries } from "../../api";

class Dashboard extends React.Component {
  state = {
    data: {},
    pieData: [],
    country: "",
    continents: [
      "Total Cases",
      "Critical",
      "Deaths",
      "Recovered",
      "Today Cases",
      "Today Deaths",
    ],
    countries: [],
    pieCurrentData: [],
  };

  async componentDidMount() {
    const data = await fetchData();
    const pieData = await fetchContinent();
    const countries = await fetchCountries();
    this.setState({ data, pieData, countries });
    this.handleContinentChange("Total Cases");
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data: data, country });
  };

  handleContinentChange = async (cont) => {
    const data = this.state.pieData.map((continent) => {
      if (cont === "Total Cases") return continent.cases;
      else if (cont === "Critical") return continent.critical;
      else if (cont === "Deaths") return continent.deaths;
      else if (cont === "Recovered") return continent.recovered;
      else if (cont === "Today Cases") return continent.todayCases;
      else if (cont === "Today Deaths") return continent.todayDeaths;

      return null;
    });

    this.setState({ pieCurrentData: data });
  };

  render() {
    const { data } = this.state;

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid item md={6} xs={12}>
            <div className={styles.countryPicker}>
              <CountryPicker
                label="Global"
                data={this.state.countries}
                handleCountryChange={this.handleCountryChange}
              />
            </div>
            <div className={styles.chart}>
              <Chart data={data} country={this.state.country} />
            </div>
          </Grid>
          <Grid item md={3} xs={12}>
            <div className={styles.dataPicker}>
              <CountryPicker
                label={null}
                data={this.state.continents}
                handleCountryChange={this.handleContinentChange}
              />
            </div>
            <PieChart data={this.state.pieCurrentData} />
          </Grid>
          <Grid item md={3} xs={12}>
            <Cards data={data} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
