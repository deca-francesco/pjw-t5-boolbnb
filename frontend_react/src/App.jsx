import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayuot'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
