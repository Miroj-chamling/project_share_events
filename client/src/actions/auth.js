import * as api from "../api/index.js"; //using * import we can use all the functions in api files.
import { ActionTypes } from "../constants/reducersActionTypes.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
