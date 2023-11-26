import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const toggleMode = () => {
    if (mode === 'light' || mode === 'success') {
      setMode('dark');
      document.body.style.backgroundColor = '#121416';
      showAlert("Dark mode is enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode is enabled", "success");
    }
  };

  const toggleGMode = () => {
    if (mode === 'light' || mode === 'dark') {
      setMode('success');
      document.body.style.backgroundColor = '#153e1a';
      showAlert("Dark-Green mode is enabled", "success");
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode is enabled", "success");
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} toggleGMode={toggleGMode} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<div className="container my-3">
            <TextForm heading="Type any msg here.." mode={mode} showAlert={showAlert} />
          </div>} />
          <Route exact path="/about" element={<About mode={mode}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
