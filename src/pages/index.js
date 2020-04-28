import React from "react";
import Helmet from "react-helmet";
import L, { geoJSON } from "leaflet";
import axios from "axios";
import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import Dashboard from "components/Dashboard/Dashboard";

const LOCATION = {
  lat: 25.276987,
  lng: 55.296249,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4.5;

const IndexPage = () => {
  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;

    let response;

    try {
      response = await axios.get("https://corona.lmao.ninja/v2/countries");
    } catch (e) {
      console.log("E", e);
      return;
    }

    const { data } = response;
    const hasData = Array.isArray(data) && data.length > 0;

    if (!hasData) return;

    const geoJson = {
      /// transform it into some geographic data
      type: "FeatureCollection",
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: "Feature",
          properties: {
            ...country,
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
        };
      }),
    };

    function countryPointToLayer(feature = {}, latlng) {
      const { properties = {} } = feature; // grab the feature and destructure into the property format
      let updatedFormatted;
      let casesString;

      const { country, updated, cases, deaths, recovered } = properties; // grab the data that we want

      casesString = `${cases}`;

      if (cases > 1000) {
        casesString = `${casesString.slice(0, -3)}k+`;
      }

      if (updated) {
        updatedFormatted = new Date(updated).toLocaleString();
      }

      const html = `
        <span class='icon-marker'>
          <span class ='icon-marker-tooltip'
            <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong>${cases}</li>
              <li><strong>Deaths:</strong>${deaths}</li>
              <li><strong>Recovered:</strong>${recovered}</li>
              <li><strong>Last Update:</strong>${updatedFormatted}</li>
            </ul>
          </span>
          ${casesString}
        </span>
      `;

      return L.marker(latlng, {
        icon: L.divIcon({
          className: "icon",
          html,
        }),
        riseOnHover: true,
      });
    }

    const geoJsonLayers = new L.GeoJSON(geoJson, {
      pointToLayer: countryPointToLayer,
    });

    geoJsonLayers.addTo(map);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Map {...mapSettings} />
      <Dashboard />
    </Layout>
  );
};

export default IndexPage;

/**
<Container type="content" className="text-center home-start">
</Container>
 */
