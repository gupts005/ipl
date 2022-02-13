import axios from "axios";
import { contestBaseURL, matchBaseURL } from "../../common/http-urls";
import { Token } from "../../common/LS";
import { notificationActions } from '../notification/notification-slice';
import { botActions } from "./bot-slice";

export const fetchAllContestByMatchId = (matchId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        matchBaseURL + `/${matchId}/contest`,
        Token
      );

      if (response.status !== 200) {
        throw new Error("Could not fetch betData data!");
      }

      const data = await response.data;
      // console.log(data,' bot file');

      return data;
    };

    try {
      const botData = await fetchData();
      dispatch(
        botActions.replaceBot({
          items: botData || [],
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const sendBetData = (betData) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await axios.post(contestBaseURL, betData, Token);

      if (response.status !== 201) {
        throw new Error("Could not send betData data!");
      }

      const data = await response.data;
      // console.log(data,' betData success');

      return data;
    };

    try {
      await sendRequest();

      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending bet data failed!",
        })
      );
      // console.log(error);
    }
  };
};

export const sendUpdatedBetData = (betData) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    const sendRequest = async () => {
      const response = await axios.put(
        contestBaseURL + `/${betData.contestId}`,
        betData,
        Token
      );
      // console.log(response);

      if (response.status !== 200) {
        throw new Error("Could not update betData data!");
      }

      const data = await response.data;
      // console.log(data,' update success');

      return data;
    };

    try {
      await sendRequest();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending bet data failed!",
        })
      );
      // console.log(error);
    }
  };
};
