import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchAuthSession } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
// import About from './pages/About';
// import Contact from './pages/Contact';

function App() {
  // State to track if user is scrolled down and authentication
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Effect to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const { tokens } = await fetchAuthSession()
      setIsAuthenticated(!!tokens)
    } catch (error) {
      setIsAuthenticated(false)
      console.error('Authentication check error:', error)
    }
  }

  // Effect to set up auth listener and check initial auth status
  useEffect(() => {
    // Check auth status immediately
    checkAuthStatus()
    
    // Set up Hub listener for auth events
    const hubListener = Hub.listen('auth', ({ payload }) => {
      const { event } = payload
      
      if (event === 'signInWithRedirect' || event === 'signedIn') {
        checkAuthStatus()
      } else if (event === 'signedOut') {
        setIsAuthenticated(false)
      } else if (event === 'tokenRefresh' || event === 'tokenRefresh_failure') {
        checkAuthStatus()
      }
    })
    
    // Clean up Hub listener
    return () => {
      hubListener()
    }
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar with sticky positioning */}
        <Navbar isScrolled={isScrolled} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App