import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/auth",
          { withCredentials: true, }
        );

        console.log(data);

        if(!data.status) {
          removeCookie("token");
          navigate("/login");
        } else {
          setUsername(data.user);
          toast(`Hello ${data.user}`);
        }

      } catch(err) {
        navigate("/login");
        console.error(err);
      }
    };
      verifyCookie();
  }, []);


  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AuthPage;
