import React, { useState } from 'react';
// import './App.css';
import PrivateRoutes from './components/private-routes/PrivateRoutes';
import LocalStorageService from './services/localStorageService'

function App() {

  const [role, setRole] = useState(LocalStorageService.getRole());
  console.log(role)

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
