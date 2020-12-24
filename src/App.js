import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Main
import AppNavbar from "./components/main/AppNavbar";
import AppFooter from "./components/main/AppFooter";

// Main Page
import MainPage from "./components/Page/main/MainPage";
// Loading
import * as loadingData from "./utilis/lf30_editor_wvri0o27.json";
import Lottie from "react-lottie";

const loadingOption = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const App = (props) => {
  const [loading, setloading] = useState(false);
  const [StartApp, setStartApp] = useState(true);
  const [fadeIn] = useState(true);
  const loadPage = useSelector((state) => state.main.trigger.load);
  const checkError = useSelector((state) => state.main.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkError.status == "400" || checkError.status == "401") {
      if (checkError.msg.msg !== "BuasriID ไม่มีอยู่ในระบบ Complaint") {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    }
  }, [checkError]);

  useEffect(() => {
    if (StartApp) {
      dispatch({ type: "PAGE_LOADING" });
      setStartApp(false);
    }
  }, [StartApp]);

  useEffect(() => {
    if (loadPage) {
      setloading(true);
      setTimeout(() => {
        dispatch({ type: "PAGE_LOADED" });
      }, 1500);
    } else {
      setloading(false);
    }
  }, [loadPage]);
  App.propTypes = {};
  return (
    <div className="App">
      {loading ? (
        <Fade in={fadeIn}>
          <br />
          <br />
          <br />
          <br />
          <Lottie options={loadingOption} height={300} width={300}></Lottie>
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            กำลังโหลดข้อมูล
          </h1>
        </Fade>
      ) : (
        <Fade in={fadeIn}>
          <AppNavbar />
          <br />
          <br />
          <br />
          <br />
          <MainPage />
          <br />
          <br />
          <br />
          <br />
          <AppFooter />
        </Fade>
      )}
    </div>
  );
};

export default connect(null, null)(App);
