import * as api from "../api/index.js"; //using * import we can use all the functions in api files.
import { ActionTypes } from "../constants/reducersActionTypes.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: ActionTypes.AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error.response.data);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: ActionTypes.AUTH, payload: data });
    navigate("/");
  } catch (error) {
    console.log(error.response.data);
  }
};
