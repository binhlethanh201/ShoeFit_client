import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";
import ReactGA from "react-ga4";

// --- Components ---
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import ScrollToTopBtn from "./components/common/ScrollToTopBtn.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

// --- Pages ---
import Home from "./pages/Home.jsx";
import About from "./pages/About/About.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import ProductList from "./pages/Product/ProductList.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Service from "./pages/Service/Service.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import TryOnVideo from "./pages/TryOnVideo/TryOnVideo.jsx";
import TryOn2D from "./pages/Tryon2D/TryOn2D.jsx";
import StyleAdvisor from "./pages/StyleAdvisor/StyleAdvisor.jsx";
import StyleDetail from "./pages/StyleAdvisor/StyleDetail.jsx";
import Pricing from "./pages/Pricing/Pricing.jsx";
import Checkout from "./pages/Pricing/Checkout.jsx";
import PaymentSuccess from "./components/pricing/PaymentSuccess.jsx";
import PaymentFailed from "./components/pricing/PaymentFailed.jsx";
import PaymentProcessing from "./components/pricing/PaymentProcessing.jsx";
import ShoeCollect from "./pages/Profile/ShoeCollect.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// --- Auth ----
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ChangePassword from "./pages/Auth/ChangePassword.jsx";
import Settings from "./pages/Setting/Settings.jsx";

// --- Admin Dashboard ---
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

const RootLayout = () => {
  return (
    <>
      <AnalyticsTracker />
      <Toaster position="top-right" richColors closeButton duration={1500} />
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

const PublicLayout = () => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
      <ScrollToTopBtn />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/collection" element={<ProductList />}></Route>
        <Route
          path="/collection/page/:pageNumber"
          element={<ProductList />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/services" element={<Service />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/tryonvideo" element={<TryOnVideo />}></Route>
        <Route path="/tryon2d" element={<TryOn2D />}></Route>
        <Route path="/styleadvisor" element={<StyleAdvisor />}></Route>
        <Route path="/styledetail/:styleId" element={<StyleDetail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/processing" element={<PaymentProcessing />}></Route>
        <Route path="/payment-success" element={<PaymentSuccess />}></Route>
        <Route path="/payment-failure" element={<PaymentFailed />}></Route>
        <Route path="/shoe-collect" element={<ShoeCollect />}></Route>
        {/* Protected Auth Route */}
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
      </Route>

      {/* Admin Route */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>,
  ),
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
