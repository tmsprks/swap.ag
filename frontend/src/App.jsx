import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import About from './components/About';
import Support from './components/Support';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
