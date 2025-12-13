import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./screens/Home"
import Proyects from "./screens/Proyects"


function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyects" element={<Proyects />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
