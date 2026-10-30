import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import AttractionDetails from './pages/AttractionDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Notices from './pages/Notices';
import NoticeDetails from './pages/NoticeDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './styles.css';

export default function App() {
  return <BrowserRouter><Layout><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/atracoes" element={<Attractions />} />
    <Route path="/atracoes/:id" element={<AttractionDetails />} />
    <Route path="/eventos" element={<Events />} />
    <Route path="/eventos/:id" element={<EventDetails />} />
    <Route path="/avisos" element={<Notices />} />
    <Route path="/avisos/:id" element={<NoticeDetails />} />
    <Route path="/admin" element={<AdminLogin />} />
    <Route path="/admin/painel" element={<AdminDashboard />} />
  </Routes></Layout></BrowserRouter>;
}
