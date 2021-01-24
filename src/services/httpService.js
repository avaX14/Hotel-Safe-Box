import axios from "axios";

const ENDPOINTS = {
  VALIDATION:
    "https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a",
};

export const validateCode = (password) => {
  return axios.get(`${ENDPOINTS.VALIDATION}?code=${password}`);
};
