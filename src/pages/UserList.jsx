import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-error">{error}</div>;
  }

  return isLoggedIn ? (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-xl font-semibold mb-2">Users List</h1>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) :
    (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="card card-image-cover">
        <div className="card-body">
          <p className="text-content2 text-center">
            Please Sign In to access users List.
          </p>
          <div className="card-footer flex justify-center">
            <Link to="/login" className="btn-secondary btn">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UserList;
