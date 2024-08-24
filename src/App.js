import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Etc */
import './assets/css/main.css';
import './assets/css/util.css';
import './assets/css/common.css';
/* Login */
import Login from './components/Login';
/* Main */
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
