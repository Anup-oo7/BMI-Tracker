import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import DataProvider from './components/context/DataProvider';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Progress from './components/progress/Progress';
import Landing from './components/login/landingPage/Landing';
import CarouselPage from './components/login/carousel/CarouselPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import About from './components/About'
import Contact from './components/Contact'
import PrivacyPolicy from './components/PrivacyPolicy'
function App() {
 
 
  
  return (
    <DataProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login"element={<Login  />} />
            <Route path="/Tour" element={<CarouselPage />} />
            <Route path="/home" element={ <Home/>} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
