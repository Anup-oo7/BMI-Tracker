import styles from "./landing.module.css";
import {  useNavigate } from "react-router-dom";
import {  styled, Box } from "@mui/material";
import Navbar from "./Navbar";
import bmibg from "../../images/bmibg.png";
import giphy from "../../images/giphy.gif";


const Component =styled(Box)`
margin-top:10em;`


  
function Landing() {
  const navigate = useNavigate()

const navigateToTour =(()=>{
  navigate('/Tour')
})
  return (
    <Component>
    <div className="container">
      <Navbar />
      <div className="row">
        <div className="col-md-12 col-sm-12 col-lg-5 left">
          <div className={styles.texts}>
            <h1>Hey! Have You Checked Your BMI Today</h1>
            <p>
              BMI is a measurement of a person's leanness or corpulence <br />
              based on their height and weight, and is intended to quantify{" "}
              <br />
              tissue mass. It is widely used as a general indicator of whether{" "}
              <br />a person has a healthy body weight for their height.
            </p>
          </div>
          <img className={styles.gif} src={giphy} alt="img" />
         
        </div>
        

        <div className=' col-md-12 col-sm-12 col-lg-7 background'>
          <img src={bmibg} alt="img" width={'100%'} />
          <div>
          <button className={styles.tour} onClick={navigateToTour}>
            Quick Tour
          </button>

          </div>
        </div>
      </div>
    </div>
    </Component>
  );
}
export default Landing;
