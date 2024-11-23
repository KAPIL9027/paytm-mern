import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import SendMoney from './components/SendMoney'

function App() {
 return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route element={<Signup/>} path='/signup'/>
        <Route element={<Signin/>} path='/signin'/>
        <Route element={<Dashboard/>} path='/dashboard'/>
        <Route element={<SendMoney/>} path='/send'/>
      </Routes>
    </BrowserRouter>
  </div>
 )
}

export default App
