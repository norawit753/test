import axios from "axios";
import {
  COMPLAINT_GET_LIST_USER,
  COMPLAINT_GET_LIST_ALL,
  COMPLAINT_ERROR,
} from "../../type/complaint/type";

export const getlist_user = ({ buasri_id, token }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ buasri_id });
  axios
    .post("http://localhost:5002/api/list/user/", body, config)
    .then((res) => {
      dispatch({
        type: COMPLAINT_GET_LIST_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: COMPLAINT_ERROR,
        payload: error.data,
      });
    });
};

export const getlist_all = ({ token }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  if (token) {
    axios
      .get("http://localhost:5002/api/list/user/all", config)
      .then((res) => {
        dispatch({
          type: COMPLAINT_GET_LIST_ALL,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: COMPLAINT_ERROR,
          payload: error.status,
        });
      });
  }
};

export const getdetail_list = ({ token, id, buasri_id }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  };
  const body = JSON.stringify({ id, buasri_id });
  console.log(body);
  // axios.post("http://localhost:5002/api/list/user/select", body, config);
};