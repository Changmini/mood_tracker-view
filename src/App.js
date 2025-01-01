import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Etc */
import './assets/css/common.css';
import './assets/css/util.css';
import './assets/css/login.css';
import './assets/css/sidebar.css';
import './assets/css/calendar.css';
import './assets/css/modal.css';
import './assets/css/timeline.css';
import './assets/css/analysis.css';
import './assets/css/neighbour.css';
import './assets/css/setting.css';
import './assets/css/dailyLogSearch.css';
/* Login */
import Login from './components/Login';
/* Main */
import Body from './components/Body'
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
            <Body />
            <Footer />
            </>
          }></Route>
          <Route path='/login' element={
            <Login />
          }></Route>
        </Routes>
      </BrowserRouter>
      <div className='loading-wrap fade'>
        <i className='bx bx-loader-alt bx-spin' ></i>
      </div>
    </div>
  );
}

export default App;
