import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Members from './pages/Members';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Join from './pages/Join';
import Login from './pages/Login';
import Admin from './pages/Admin';
import EventDetails from './pages/EventDetails';
import MemberDetails from './pages/MemberDetails';
import GalleryDetails from './pages/GalleryDetails';
import ThemeSwitcher from './components/layout/ThemeSwitcher';
import IntroManager from './components/intro/IntroManager';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-main transition-colors duration-500">
      <IntroManager />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:id" element={<GalleryDetails />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
