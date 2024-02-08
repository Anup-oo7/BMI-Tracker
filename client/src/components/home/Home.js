
import GaugeChart from "react-gauge-chart";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";
import Header from "../header/Header";
import "./home.css";
import { useState, useEffect, useContext } from "react";
import { API } from "../../service/api.js";
import { DataContext } from "../context/DataProvider";
import underWeight from "../images/underWeight.png";
import over from "../images/over.png";
import obese from "../images/obese.png";
import normal from "../images/normal.png";
import extremeObese from "../images/extremeObese.png";
import { UseAuth } from "../login/UseAuth.js";
import { useNavigate } from "react-router-dom";


var date = moment().format("ll");

const initialbmiMeasured = {
  bmi: "",
  email: "",
  measuredDate: date,
};

function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [message, setMessage] = useState("");
  const [bmi, setBmi] = useState("");
  const [riskManagement, setRiskManagement] = useState("Calculate Your BMI to view analysis");
  const [post, setPostbmi] = useState(initialbmiMeasured);
  const { account } = useContext(DataContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(<h3>All work and no play can make you Unhealthy</h3>);




  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect to login page if not authenticated
      navigate('/');
    }
  }, [isAuthenticated, navigate]);





  /*const cookiesCreds = async () => {
    try {
      const response = await fetch('http://localhost:4001/useAuth',{
        method: 'GET', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:"include"
      });

    if(response.ok){
      console.log(response)
      await response.json()
    }else {
      console.error('error in fetching login data', response.status, response.statusText)
    }
     
    } catch (error) {
      console.error("Error getting creds:", error);
    }
  };

useEffect(()=>{
  cookiesCreds();
},[])*/


  useEffect(() => {
    post.email = account.email;
  });

  ///////////////////////// BMI CALCULATION   //////////////////////

  const calculatebmi = async () => {
    if ((!height || !weight) || (height<0||weight<0)) {
      toast.error("Please enter correct value to calculate BMI");
      return;
    }else if(!account.email){
      toast.error('user logged out');
      return
    }
    const h = height / 100;
    const bmi = weight / (h * h);
    const updatedPost = { ...post, bmi: bmi.toFixed(2) };

    const text = "your BMI is:-";
    setText(text);

    setPostbmi(updatedPost);

    ///////////////////////////////   API  TO SEND BMI DATA ////////////////
    try {
      await API.postBmi(updatedPost);
    } catch (error) {
      console.log(error);
    }

    ////////////////////////////////// BMI VALUES, MESSAGE AND RISK MANAGEMENT /////////////////
    if (bmi < 16) {
      setMessage("Severe Thinness. ");
      setImage(<img src={underWeight} alt="under-weight" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "#d3d30a" }}>
            In general, your plan may include:
          </h4>
          <p>
            1.Eating more frequently. Slowly begin to eat 5 to 6 meals during
            the day. <br />
            2.Choosing food with lots of nutrients. <br />
            3.Top it off. <br />
            4.Try smoothies and shakes. <br />
            5.But watch what and when you drink. <br />
            6.Exercise.
          </p>
        </div>
      );
    } else if (bmi >= 16 && bmi < 17) {
      setMessage("Moderate Thinness. ");
      setImage(<img src={underWeight} alt="under-weight" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "#d3d30a" }}>
            In general, your plan may include:
          </h4>
          <p>
            To gain weight your body needs to take in more calories than it
            burns. <br />
            Eating more calories will help increases weight, which increases
            bmi. <br />
            It is easier to figure out how to lose weight than it is to gain
            weight. <br />
            Everyone's bodies are different and factors such as genetics come
            into play..
          </p>
        </div>
      );
    } else if (bmi >= 17 && bmi < 18.5) {
      setMessage("Mild Thinness. ");
      setImage(<img src={underWeight} alt="under-weight" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "#d3d30a" }}>
            In general, your plan may include:
          </h4>
          <p>
            1.To gain weight your body needs to take in more calories than it
            burns. <br />
            2. Eating more calories will help increases weight, which increases
            bmi. <br />
            3. It is easier to figure out how to lose weight than it is to gain
            weight. <br />
            4. Everyone's bodies are different and factors such as genetics come
            into play..
          </p>
        </div>
      );
    } else if (bmi >= 18.5 && bmi < 25) {
      setMessage("Healthy weight. ");
      setImage(<img src={normal} alt="normal" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "green" }}>
            {" "}
            If you’re at a healthy bmi, how do you stay there? Listed are few
            Tips for maintaining a healthy bmi
          </h4>
          <p>
            <b> 1.Get—and stay—active:</b> Exercise sounds unpleasant, but it’s a
            crucial part of maintaining a healthy bmi. <br />
            2. It doesn’t necessarily have to be miserable either. If you can find
            a sport or vigorous outdoor activity you enjoy doing, <br />
            it will be much easier to keep your body mass down. <br />
            <b>3. Avoid random snacking:</b> Random snacking throughout the day,
            or grazing, is a major culprit for weight gain.
          </p>
        </div>
      );
    } else if (bmi >= 25 && bmi < 30) {
      setMessage("Overweight. ");
      setImage(<img src={over} alt="over" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "orange" }}>How To Lower bmi</h4>
          <p>
            1.Reduce your calorie intake to prevent gaining weight. <br />
            2.This is the most basic strategy for lowering your bmi level. ...{" "}
            <br />
            3.Exercise generally boosts your metabolism, which in turn, <br />
            burns calories and causes weight loss. <br />
            4.Enhance your diet. <br />
            5.Drink more water. <br />
            6.Get enough sleep.
          </p>
        </div>
      );
    } else if (bmi >= 30 && bmi < 35) {
      setMessage("Obese Class I. ");
      setImage(<img src={over} alt="over" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <di>
          <h4 style={{ color: "red" }}>You need to take it serious</h4>
          <p>
           1. The best way to treat obesity is to eat a healthy, <br />
            reduced-calorie diet and exercise regularly. <br />
           2. <b>To do this you should:</b> eat a balanced, calorie-controlled
            diet as <br />
            recommended by your GP or weight loss management health professional{" "}
            <br />
            (such as a dietitian). <br />
           3.Join a local weight loss group.
          </p>
        </di>
      );
    } else if (bmi >= 35 && bmi < 40) {
      setMessage("Obese Class II. ");
      setImage(<img src={obese} alt="obese" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "red" }}>You may need surgery for weight loss</h4>
          <p>
            bmi of 35 – 40 is considered “severely obese” and indicates <br />
            consideration of procedures like a weight loss balloon, Aspire
            Assist. <br />
            Surgery may also be considered if an obesity-related illness is
            present. <br />
          </p>
        </div>
      );
    } else if (bmi >= 40) {
      setMessage("Obese Class III. ");
      setImage(<img src={extremeObese} alt="extreme-obese" width={150} />);
      setBmi(bmi.toFixed(2));
      setRiskManagement(
        <div>
          <h4 style={{ color: "red" }}>
            Treating class III obesity involves a multi-prong strategy:
          </h4>
          <p>
            1.Healthy lifestyle changes. <br />
            2.Behavioral and psychological therapy. <br />
            3.Medications. <br />
            4.Surgical procedures
          </p>
        </div>
      );
    }
  };

  ///////////////// //////////////////////     BMI SCALE ADJUSTMENT  ////////////////
  const gaugeCalc = (bmi) => {
    var result = 0;
    if (bmi > 0 && bmi < 16) {
      result = getPercentage(bmi, 0, 16, 0.0);
    } else if (bmi >= 16 && bmi < 17) {
      result = getPercentage(bmi, 16, 17, 0.11);
    } else if (bmi >= 17 && bmi < 18.5) {
      result = getPercentage(bmi, 17, 18.5, 0.22);
    } else if (bmi >= 18.5 && bmi <= 25) {
      result = getPercentage(bmi, 18.5, 25, 0.38);
    } else if (bmi > 25 && bmi < 30) {
      result = getPercentage(bmi, 25, 30, 0.6);
    } else if (bmi >= 30 && bmi < 35) {
      result = getPercentage(bmi, 30, 35, 0.77);
    } else if (bmi >= 35 && bmi <= 40) {
      result = getPercentage(bmi, 35, 40, 0.88);
    } else if (bmi > 40) {
      result = getPercentage(bmi, 40, bmi > 40, 1.2);
    }
    return result;
  };

  function getPercentage(bmi, lowerBound, upperBound, segmentAdjustment) {
    return (
      (bmi - lowerBound) / (upperBound - lowerBound) / 8 + segmentAdjustment
    );
  }

  return (
    <>


   

      <ToastContainer />
      <Header className="header" />
      <div className="container top" style={{marginTop:'5em'}} >

        {/*********************************************CALCULATOR**********************************/}
        <div className="row rowOne">
        <div className=" col-md-4 col-sm-12 col-lg-4 calculator">
          <h1>BMI Calculator</h1>
          <span>
            Let's check your Body Fitness. <br></br> Type the values below
          </span>

          <div className="area-input">
            <input
              value={weight}
              type="number"
              placeholder="Weight (in kg)"
              onChange={(e) => setWeight(e.target.value)}
            />

            <input
              value={height}
              type="number"
              placeholder="Height (in cm)"
              onChange={(e) => setHeight(e.target.value)}
            />

            <button onClick={calculatebmi}>Calculate</button>
          </div>
          <h2>
            {" "}
            {message} {text} {bmi}{" "}
          </h2>
        </div>

        {/***********************************BMI SCALE**************/}

        <div  className=" col-md-4 col-sm-12 col-lg-4 scale">
          <GaugeChart
            id="gauge-chart"
            percent={gaugeCalc(bmi)}
            nrOfLevels={8}
            colors={[
              "#F9F94B",
              "#D5D513",
              "#7DFB64",
              "#228B22",
              "#F5D94E",
              "orange",
              "#EF3C42",
              "#FF0000",
            ]}
            textColor="none"
          />

          <h4
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            {" "}
            {text} {bmi}
          </h4>
        </div>

        <div  className=" col-md-4 col-sm-12 col-lg-4 image">
          <div>{image}</div>
        </div>
        </div>
        {/*************************************PARAGRAPH CONTENT*********************/}
        <div className="row rowTwo" style={{margi:'2em',marginBottom:'2em'}}>
        <div className="col-md-6 col-sm-12 col-lg-6">
          <h4>What is Body Mass Index ?</h4>
          <p style={{ color: "#1976d2" }}>
            Body mass index (bmi) is an approximate measure for health. <br />
            It is calculated by dividing your weight in kilograms <br />
            by your height in metres squared (m2). <br />
            <br />
            bmi is intended for adults only, as children and <br />
            adolescents are constantly growing. <br />
            This makes it difficult to have set values for bmi cut-offs <br />
            for young people.However, in adults who have stopped growing, <br />
            an increase in bmi is usually caused by an increase in body fat.
          </p>
        </div>

        {/*************************************RISK MANAGEMENT*********************/}
        <div className=" col-md-6 col-sm-12 col-lg-6 risk">
          <h3 className="risk">Risk Management</h3>
          {riskManagement}
        </div>
       </div>
       </div>
        {/*************************************FOOTER*********************/}
        <div className="container">
       <div className="row footer" >
         <div className=" col-md-6 col-sm-12 col-lg-3">
          <ul>
            <li>
              <h4>Edureify</h4>
            </li>
            <li>
              <p>
                Edureify is one of India's fastest-growing Ed-Tech 
                startups. Edureify is revolutionizing <br />
                the 21st-century job market by <br />
                transforming youth into highly skilled <br />
                tech professionals irrespective of their educational
                background with its hybrid Bootcamp programs <br />
              </p>
            </li>
          </ul>
          </div>

          <div   className=" col-md-6 col-sm-12 col-lg-3"> 
          <ul>
            <li>
              <h4>Quicklinks</h4>
            </li>
            {/* <li>
              <Link to={"https://edureify.com/"}>Edureify</Link>
            </li> */}
          </ul>
          </div>

          <div   className=" col-md-6 col-sm-12 col-lg-3">
          <ul>
            <li>
              <h4>Company</h4>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            {/* <li>
              <Link to={"https://edureify.com/home/career"}>Careers</Link>
            </li> */}
            <li>
              <Link to={"/contactus"}>Contact</Link>
            </li>
            {/* <li>
              <Link to={"https://edureify.com/home/careerpolicy"}>
                Career Policy
              </Link>
            </li> */}
            <li>
              <Link to={"/privacy"}>
                Privacy Policy
              </Link>
            </li>
            {/* <li>
              <Link to={"https://edureify.com/home/conduct"}>
                Code of Conduct Policy
              </Link>
            </li> */}
            {/* <li>
              <Link to={"https://edureify.com/home/jobguarantee"}>
                Job guarantee policy
              </Link>
            </li> */}
          </ul>
          </div>
          
          <div  className=" col-md-6 col-sm-12 col-lg-3">
          <ul>
            <li>
              <h4>Contact Us</h4>
            </li>
            <li>+91 8076909119</li>
            <li>support@edureify.com</li>
            <li>
              B-70, First Floor, Sector-2, Noida, <br />
              Gautam Buddha Nagar, U.P-201301
            </li>
          </ul>
          </div>
        </div>
        </div>
     
    </>
  );
}

export default Home;
