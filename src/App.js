import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- Components ---
import Footer from "./components/home/Footer/Footer";
import Header from "./components/home/Header/Header";
import ScrollToTopBtn from "./components/common/ScrollToTopBtn.jsx";

// --- Pages: Auth & Common ---
import Home from './pages/Home.jsx';
import About from "./pages/About/About.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Collection from "./pages/Collection/Collection.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Search from "./pages/Search/Search.jsx";
import Service from "./pages/Service/Service.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import TryOnAR from "./pages/TryonAR/TryOnAR.jsx";
import TryOn2D from "./pages/Tryon2D/TryOn2D.jsx";
import StyleAdvisor from "./pages/StyleAdvisor/StyleAdvisor.jsx";
import StyleDetail from "./pages/StyleAdvisor/StyleDetail.jsx";
import ErrorPage from './pages/ErrorPage.jsx';


const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <ScrollToTopBtn />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/collection" element={<Collection />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/services" element={<Service />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/tryonar" element={<TryOnAR />}></Route>
        <Route path="/tryon2d" element={<TryOn2D />}></Route>
        <Route path="/styleadvisor" element={<StyleAdvisor />}></Route>
        <Route path="/styledetail/:styleId" element={<StyleDetail />}></Route>
      </Route>

    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Chỉ fetchCart khi cần thiết (ví dụ check token)
    // dispatch(fetchCart()); 
  }, [dispatch]);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;