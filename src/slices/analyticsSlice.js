import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  organicUsers: 0,
  referralUsers: 0,
  totalUsers: 0,
  thisWeekUsers: 0,
  thisMonthUsers: 0,
  lastMonthUsers: 0,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    fetchAnalyticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnalyticsSuccess: (state, action) => {
      const {
        organicUsers,
        referralUsers,
        totalUsers,
        thisWeekUsers,
        thisMonthUsers,
        lastMonthUsers,
      } = action.payload;
      state.organicUsers = organicUsers;
      state.referralUsers = referralUsers;
      state.totalUsers = totalUsers;
      state.thisWeekUsers = thisWeekUsers;
      state.thisMonthUsers = thisMonthUsers;
      state.lastMonthUsers = lastMonthUsers;
      state.loading = false;
    },
    fetchAnalyticsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
