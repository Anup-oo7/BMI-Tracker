
import React, { useState, useEffect, useContext, useCallback } from "react";
import Header from "../header/Header";
import Chart from "react-apexcharts";
import { DataContext } from "../context/DataProvider";
import './Progress.css'

import { useNavigate } from 'react-router-dom';
import { UseAuth } from "../login/UseAuth";


const Progress = () => {
  const [graph, setGraph] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const {account} =useContext(DataContext)

  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();
/////////////////////////////////////////////// API FROM DATABASE //////////////////
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/myBmi');
    
      if (response.ok) {
        
        const responseData = await response.json();

        const currentUser = account.email;
        const currentUserData = responseData.filter(item => item.email === currentUser);

        const startIndex = Math.max(currentUserData.length-10, 0);
        const lasst3Entries =currentUserData.slice(startIndex)

        const categories = lasst3Entries.map((item) => item.measuredDate);
        const bmiValues = lasst3Entries.map((item) => item.bmi);
        setCategories(categories);
        setData(bmiValues);

      } else {
        console.error("Failed to fetch BMI data.");
      }
    } catch (error) {
      console.error("Error fetching BMI data:", error);
    }
  };

  ///////////////////////////////////////    BMI GRAPH /////////////////////

  const bmiGraph = useCallback(() => {
    setGraph(
      <div className="graph">
      <div className="graphBackground"></div>
         <Chart
        type="line"
        width='100%'
        height={'440'}
        
        series={[
          {
            name: '',
            data: [...data],
            type: 'bar',
            color:'#caa473'
          },
          {
            name: '',
            data: [...data],
            type: 'line',
            color: '#262526'
          }
        ]}

        options={{
          title: {
            text: 'Your BMI progress report',
            style: { fontSize: 25 }
          },
          
         
          theme: { mode: 'light' },
          xaxis: {
            categories: [...categories],
            title: {
              text: 'BMI Measured',
             style:{fontSize:20}
            }
          },

          yaxis: {
            labels: {
              formatter: (val) => {
                return `BMI ${val}`;
              },
              style: {
                fontSize: '15',
                colors: ['#0d47a1']
              }
            }
          },
          plotOptions:{
            bar:{
              borderColor: '#ff5733'
            }
          }
        
        }}
      />

      </div>
    );
  },[data, categories])

  useEffect(() => {
    bmiGraph();
  },[bmiGraph]);

  //////////////////// Redirect to login page if not authenticated//////////////////
  useEffect(() => {
    if (!isAuthenticated()) {
      
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <div className="container" style={{marginTop:'2em'}}>

      <div style={{ paddingTop: 50 }}>
        <h2 style={{color:'#843737'}}>Let's Check Your BMI journey</h2>

        <button className="check" onClick={fetchData}>Check</button>
        
        <div>{graph}</div>
      </div>
      </div>
    </>
  );
};

export default Progress;




