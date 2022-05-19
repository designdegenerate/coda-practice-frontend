import { apiUrl } from "../../config/constants";
import axios from "axios";
import { setSpacesLoad, finishSpacesLoad, setSpacesData } from "./slice";

export const fetchSpaces = () => {
  return async (dispatch, getState) => {
    dispatch(setSpacesLoad());
    try {
      const spacesData = await axios.get(`${apiUrl}/spaces`);
      dispatch(setSpacesData(spacesData.data));
      dispatch(finishSpacesLoad());
    } catch (error) {
      console.log(error);
    }
    dispatch(finishSpacesLoad());
    }
};
