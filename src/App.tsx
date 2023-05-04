import './App.css'
import Home from './pages/Home/Home'
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
            </Router>
        </>
    )
}

export default App
