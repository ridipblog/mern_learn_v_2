import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
