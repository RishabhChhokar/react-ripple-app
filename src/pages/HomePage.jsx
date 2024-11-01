/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAnalyticsData } from "../slices/analyticsActions";
import { useEffect } from "react";
import AnalyticsGraph from "../components/graph/AnalyticsGraph";

const AnalyticsCard = ({ title, value }) => (
  <div className="card h-13 p-2 bg-slate-300 shadow-slate-400 rounded-ss-xl flex flex-col justify-center">
    <h3 className="text-base font-semibold text-black">{title}</h3>
    <p className="text-lg text-black">{value}</p>
  </div>
);

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const {
    organicUsers,
    referralUsers,
    totalUsers,
    thisWeekUsers,
    thisMonthUsers,
    lastMonthUsers,
    // eslint-disable-next-line no-unused-vars
    loading,
    // eslint-disable-next-line no-unused-vars
    error,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  return isLoggedIn ? (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-violet-300 to-teal-200 pt-2">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-start font-bold text-black mb-1">Analytics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          <AnalyticsCard title="Organic Users" value={organicUsers} />
          <AnalyticsCard title="Referral Users" value={referralUsers} />
          <AnalyticsCard title="Total Users" value={totalUsers} />
          <AnalyticsCard title="This Week's Users" value={thisWeekUsers} />
          <AnalyticsCard title="This Month's Users" value={thisMonthUsers} />
          <AnalyticsCard title="Last Month's Users" value={lastMonthUsers} />
        </div>
      </div>
      <AnalyticsGraph />
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-300 to-teal-200">
      <div className="card card-image-cover h-80 sm:h-96 md:h-1/2">
        {" "}
        <div className="card-body">
          <h2 className="card-header">Welcome to Analytica</h2>
          <p className="text-content2">
            Please Sign In to access more features.
          </p>
          <div className="card-footer flex justify-center">
            <Link to={'/login'} className="btn-secondary btn">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
