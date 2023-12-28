import { useState } from 'react'
import Register from './components/Register'
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:3001';
  // axios.defaults.withCredentials = true; // so that we can set cookies from our api

  return (
    <div className='text-white'>
      <Register />
    </div>
  )
}

export default App
