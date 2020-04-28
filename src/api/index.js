import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const url2 = "https://corona.lmao.ninja/v2";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchContinent = async () => {
  try {
    const { data } = await axios.get(`${url2}/continents`);

    return data.map(
      ({
        continent,
        cases,
        critical,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
      }) => ({
        continent: continent,
        cases,
        critical,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
      })
    );
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
