import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayuot'
import HomePage from './pages/HomePage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />} />
          <Route path='/' element={<HomePage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
