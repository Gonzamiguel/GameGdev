import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppTresEnLinea } from "./components/AppTresEnLinea.jsx";
import Navbar from "./components/Navbar.jsx";
import { BuscaMinas } from "./components/buscaMinas.jsx";
import Index from './components/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tres-en-línea" element={<AppTresEnLinea />} />
        <Route path="/busca-minas" element={<BuscaMinas/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
