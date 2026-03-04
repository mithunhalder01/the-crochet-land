import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import AdminLayout from "./admin/AdminLayout";
import AdminRoute from "./admin/AdminRoute";
import Dashboard from "./admin/pages/Dashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminUsers from "./admin/pages/AdminUsers";



function App() {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-brand-bg min-h-screen text-brand-text">

      {!isAdminRoute && <Navbar cart={cart} />}

      <div className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/product/:slug" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/shop" element={<Shop cart={cart} setCart={setCart} />} />
          <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>

      </div>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <BottomNav />}

    </div>
  );
}

export default App;
