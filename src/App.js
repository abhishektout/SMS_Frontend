import './App.css';
import AdmissionProcess from './admission/AdmissionProcess';
import FeesCOllection from './FeesCollect/fees_collect';
import { Route, Router, Routes } from 'react-router-dom';
import Home from './Home/home';
import { Attendance } from './attendance/attendance';
import { Admin } from './admin/admin';


function App() {
  return <>
      {/* <Admin/> */}
      <Routes>
      <Route path='/' element={<Admin/>}/>

      <Route path='/home' element={<Home/>}/>
      <Route path='/addmission' element={<AdmissionProcess/>}/>
      <Route path='/fees' element={<FeesCOllection/>}/>
      <Route path='/attendance' element={<Attendance/>} />
      <Route />
    </Routes>
    </>
}
export default App;
