
import { useNavigate } from 'react-router-dom';
import {AppBar, styled, Toolbar} from '@mui/material';
import styles from "./landing.module.css";
import logo from '../../images/logo.png'
import home from '../../images/hom.png'



const Components = styled(AppBar)`
  background: #24252a;
  margin-bottom: 30px;
  color: #fff;
  height:70px;
  align-items: middle;
  
 
`;

const Container = styled(Toolbar)`

  justify-content: space-between;
  & > a {
    padding: 15px;
    font-size: 20px;
  }
  & > a > svg {
    font-size: 40px;
  };
`;

function Navbar(){
  const navigate =useNavigate()

  const startNav =(()=>{
    navigate('/login')
  })
const homeNav =()=>{
  navigate('/')
}
  
 
    return (
     
        
          <Components>
            <Container>
              
              <img
                style={{ borderRadius: 10, height: 48 }}
                src={logo}
                alt=""
              />

              <button style={{borderRadius:25}} onClick={homeNav}>
                <img  src={home} alt="" width={42}/>
              </button>

              <button  className={styles.getStart} onClick={startNav}>Get Started</button>
             
            </Container>
          </Components>
      
      
    );
}
export default Navbar;