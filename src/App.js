
import './App.css';
import Header from './Components/Header';
import MultipleDataPointMap from './Components/MultipleDataPointMap';
import PolygonLayerMap from './Components/PolygonLayerMap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    
      
       <Router>
         <Header/>
        <Routes>
          <Route path='/' element={<MultipleDataPointMap />} />
          <Route path='/polygon' element={ <PolygonLayerMap />} />
         
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
