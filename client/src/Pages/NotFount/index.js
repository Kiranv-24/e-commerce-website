import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../Mycontext/index.js";
const NotFound = () => {
  const navigate = useNavigate();
  const { setisHeaderFooter } = useContext(MyContext);
  useEffect(() => {
    setisHeaderFooter(false);
    const timer = setTimeout(() => {
      window.location.href = "https://techmart-weld.vercel.app/";
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Page Not Found</h1>
      <p>Redirecting to http://www.flipkart.com/http404.php</p>
    </div>
  );
};

export default NotFound;
