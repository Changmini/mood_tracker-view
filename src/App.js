import './assets/css/common.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
            <Header />
            <Body />
            <Footer />
            </>
          }></Route>
          <Route path='/login' element={
            <Login />
          }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
