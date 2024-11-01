import {
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} from "./analyticsSlice";
// eslint-disable-next-line no-unused-vars
import { analytics } from "../firebase/firebase";


export const fetchAnalyticsData = () => async (dispatch) => {
  dispatch(fetchAnalyticsStart());
  try {
    const data = {
      organicUsers: 132,
      referralUsers: 4,
      totalUsers: 34,
      thisWeekUsers: 12,
      thisMonthUsers: 10,
      lastMonthUsers: 0,
    };
    dispatch(fetchAnalyticsSuccess(data));
  } catch (error) {
    dispatch(fetchAnalyticsFailure(error.message));
  }
};
