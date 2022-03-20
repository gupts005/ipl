import axios from "axios";
import { getErrorMessage } from "../../common/error-function";
import { contestBaseURL, matchBaseURL, usersBaseURL } from "../../common/http-urls";
import { notificationActions } from "../notification/notification-slice";
import { botActions } from "./bot-slice";

export const fetchAllContestByMatchId = (matchId, token1) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        matchBaseURL + `/${matchId}/contest`,
        token1
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

export const fetchUserContestByMatchId = (userId, matchId, token1) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        usersBaseURL + `/${userId}/contest/${matchId}`,
        token1
      );

      if (response.status !== 200) {
        throw new Error(response);
      }

      const data = await response.data;
      // console.log(data,' bot file');

      return data;
    };

    try {
      const botData = await fetchData();
      // dispatch(
      //   botActions.replaceBot({
      //     items: botData || [],
      //   })
      // );
    } catch (error) {
      const processedError = getErrorMessage(error);
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: processedError,
        })
      );
    }
  };
};

export const sendBetData = (betData, Token) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Bet data!",
      })
    );

    const sendRequest = async () => {
      const response = await axios.post(contestBaseURL, betData, Token);

      if (response.status !== 201) {
        throw new Error(response);
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
          message: "Bet Placed Successfully!",
        })
      );
    } catch (error) {
      const processedError = getErrorMessage(error);
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: processedError,
        })
      );
      // console.log(error);
    }
  };
};

export const sendUpdatedBetData = (betData, Token) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Updating Bet data!",
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
        throw new Error(response);
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
          message: "Bet Data Updated Successfully!",
        })
      );
    } catch (error) {
      const processedError = getErrorMessage(error);
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: processedError,
        })
      );
      // console.log(error);
    }
  };
};
