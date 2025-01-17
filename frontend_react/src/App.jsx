import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayuot'
import HomePage from './pages/HomePage'
import ProtectedHomePage from './pages/ProtectedHomePage'
import SingleApartmentPage from './pages/SingleApartmentPage'
import PrivateRoute from './components/LoginComponents/PrivateRoute'
import LoginPage from './pages/Loginpage'
import NewApartmentPage from './pages/NewApartmentPage'

import AdvancedSearchPage from './pages/AdvancedSearchPage'

import OwnerProfilePage from './pages/OwnerProfilePage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>

            <Route path='/' element={<HomePage />} />
            <Route path="/apartments/:id" element={<SingleApartmentPage />} />
            <Route path="/search" element={<AdvancedSearchPage />} />
            <Route path='/protected' element={
              <PrivateRoute>
                <ProtectedHomePage />
              </PrivateRoute>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/new-apartment' element={
              <PrivateRoute>
                <NewApartmentPage />
              </PrivateRoute>} />
            <Route path='/owners/:id' element={
              <PrivateRoute>
                <OwnerProfilePage />
              </PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
