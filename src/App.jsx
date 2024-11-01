import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/Homepage";
import Register from "./pages/Register";
import UserList from "./pages/UserList";
import Layout from "./components/Layout/Layout";
const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
