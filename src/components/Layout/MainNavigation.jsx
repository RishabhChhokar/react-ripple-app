import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <div className="navbar rounded-lg">
      <div className="navbar-start">
        <Link className="btn btn-ghost text-lg" to={"/"}>
          Analytica
        </Link>
      </div>
      <div className="navbar-end">
        <div className="avatar avatar-ring avatar-md">
          <div className="dropdown-container">
            <div className="dropdown">
              <label
                className="btn btn-ghost flex cursor-pointer px-0"
                tabIndex="0"
              >
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </label>
              <div className="dropdown-menu dropdown-menu-bottom-left w-40">
                {user ? (
                  <>
                    <Link
                      tabIndex="-1"
                      className="dropdown-item text cursor-pointer"
                      to={"/user-list"}
                    >
                      Users
                    </Link>
                    <a
                      tabIndex="-1"
                      className="dropdown-item text-error cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log out
                    </a>
                  </>
                ) : (
                  <a
                    tabIndex="-1"
                    className="dropdown-item text-sm cursor-pointer"
                    onClick={handleLogout}
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
