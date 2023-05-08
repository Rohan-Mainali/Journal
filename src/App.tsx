import './App.css'
import Home from './pages/Home/Home'
import Journal from './pages/Journal/Journal'
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/journal/:id" element={<Journal />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
