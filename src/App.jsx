import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useAuth } from "./context/useAuth";
import Shop from "./pages/Shop";



function App() {
  const { user } = useAuth();

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text">

      <Navbar />

      <div className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

      </div>

      <Footer />
      <BottomNav />

    </div>
  );
}

export default App;
