import React, { useState, useEffect } from "react";
import { FormControl, Select } from "@material-ui/core";

const CountryPicker = (props) => {
  return (
    <div>
      <FormControl>
        <Select
          native
          defaultValue=""
          id="grouped-native-select"
          onChange={(e) => props.handleCountryChange(e.target.value)}
        >
          {props.label !== null ? (
            <option value="">{props.label}</option>
          ) : null}
          {props.data.map((
            item,
            i /// why need key?
          ) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CountryPicker;
