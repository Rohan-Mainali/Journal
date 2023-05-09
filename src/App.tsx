import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Journal from './pages/Journal/Journal'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal/:id" element={<Journal />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
