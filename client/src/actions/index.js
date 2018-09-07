import axios from "axios";
import { FETCH_USER } from "./types";

const fetchUser = () => {
  return dispatch => {
    axios
      .get("/api/current_user")
      .then(response => dispatch({ type: FETCH_USER, payload: response }));
  };
};
