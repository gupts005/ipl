import axios from "axios";
import { usersBaseURL } from "../../common/http-urls";
import { allUsersFutureBetsActions } from "./allUsersFutureBets-slice";

export const fetchallUserFutureBets = (Token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(usersBaseURL +"/future-contest", Token);

      if (response.status !== 200) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.data;
      // console.log(data, " allUsersFutureBets file");

      return data;
    };

    try {
      const allUsersFutureBets = await fetchData();
      dispatch(
        allUsersFutureBetsActions.replaceallUsersFutureBets({
          items: allUsersFutureBets || [],
          changed: true
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};
