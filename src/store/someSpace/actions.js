import { apiUrl } from "../../config/constants";
import axios from "axios";
import { setSomeSpaceLoad, setSomeSpaceData, finishSomeSpaceLoad } from "./slice";

//TODO: CHANGE ALL

export const fetchSomeSpace = () => {
  return async (dispatch, getState) => {
    dispatch(setSomeSpaceLoad());
    try {
      const spacesData = await axios.get(`${apiUrl}/spaces/`);
      dispatch(setSomeSpaceData(spacesData.data));
      dispatch(finishSomeSpaceLoad());
    } catch (error) {
      console.log(error);
    }
    dispatch(finishSomeSpaceLoad());
    }
};
