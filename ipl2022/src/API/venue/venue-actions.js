
import axios from 'axios';
import { venueBaseURL } from '../../common/http-urls';
import { Token } from '../../UI/common/constants/data';
import { venueActions } from './venue-slice';


export const fetchVenueData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(venueBaseURL,Token);

      if (response.status !== 200) {
        throw new Error('Could not fetch match data!');
      }

      const data = await response.data;
      console.log(data,' actions file');

      return data;
    };

    try {
      const venueData = await fetchData();
      dispatch(
        venueActions.replaceVenue({
          items : venueData || []
        })
      );
    } catch (error) {
      throw new Error(error);
      // dispatch(
      //   venueActions.showNotification({
      //     status: 'error',
      //     title: 'Error!',
      //     message: 'Fetching match data failed!',
      //   })
      // );
    }
  };
};