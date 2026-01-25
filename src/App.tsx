import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Join from './pages/Join';
import Login from './pages/Login';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
