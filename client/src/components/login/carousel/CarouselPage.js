import Carousel from 'react-bootstrap/Carousel';
import firstSlide from './CarouselImage/firsr.jpg'
import secondSlide from './CarouselImage/secnd.png'
import thirdSlide from './CarouselImage/third.jpg'
import Navbar from '../landingPage/Navbar';
function CarouselPage() {
  return (

    <div className="container">
        <Navbar/>
    <Carousel style={{marginTop:'5em'}}>
      <Carousel.Item interval={4000}>
       <img src={firstSlide} alt="firstSlide" width={'50%'} height={'40%'} />
        
      </Carousel.Item>
      <Carousel.Item interval={5000}>
       
     
        <img src={secondSlide} alt="secondlide" width={'60%'}  />
       
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        
       
        <img src={thirdSlide} alt="thirdSlide" width={'60%'}  />
        
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CarouselPage;