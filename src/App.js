import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home1 from './pages/home/Home1';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
const App=()=>
{
  return(
    <BrowserRouter>
    <Routes>
        < Route path='/' element={<Home1/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/id"element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>  
  );
}
export default App;
