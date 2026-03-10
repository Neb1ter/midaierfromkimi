import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { ProductDetail } from '@/pages/ProductDetail';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Login } from '@/pages/Login';
import { Distribution } from '@/pages/Distribution';
import { DistributorDashboard } from '@/pages/DistributorDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';

// Layout component with Header and Footer
const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Layout without Footer for admin pages
const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'inherit',
          },
        }}
      />
      <Routes>
        {/* Main routes with Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/distribution" element={<Distribution />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/distributor" element={<DistributorDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
