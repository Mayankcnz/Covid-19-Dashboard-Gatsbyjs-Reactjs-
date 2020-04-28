import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading...";
  }
  return (
    <div className={styles.container}>
      <CardContent
        xs={12}
        md={3}
        component={Card}
        className={cx(styles.card, styles.infected)}
      >
        <Typography color="white" gutterBottom>
          Infected
        </Typography>
        <Typography variant="h5" component="h2">
          <CountUp
            start={0}
            end={confirmed.value}
            duration={2.75}
            separator=","
          />
        </Typography>
        <Typography color="white">
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          Number of active cases of COVID-19.
        </Typography>
      </CardContent>

      <CardContent
        xs={12}
        md={3}
        component={Card}
        className={cx(styles.card, styles.recovered)}
      >
        <Typography color="white" gutterBottom>
          Recovered
        </Typography>
        <Typography variant="h5" component="h2">
          <CountUp
            start={0}
            end={recovered.value}
            duration={2.75}
            separator=","
          />
        </Typography>
        <Typography color="white">
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          Number of recoveries from COVID-19.
        </Typography>
      </CardContent>

      <CardContent
        xs={12}
        md={3}
        component={Card}
        className={cx(styles.card, styles.deaths)}
      >
        <Typography color="white" gutterBottom>
          Deaths
        </Typography>
        <Typography variant="h5" component="h2">
          <CountUp start={0} end={deaths.value} duration={2.75} separator="," />
        </Typography>
        <Typography color="white">
          {new Date(lastUpdate).toDateString()}
        </Typography>
        <Typography variant="body2" component="p">
          Number of deaths caused by COVID-19.
        </Typography>
      </CardContent>
    </div>
  );
};

export default Cards;
