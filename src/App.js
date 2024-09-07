import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import MainLayout from "./components/mainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="view-enquiry/:id" element={<ViewEnquiry />} />
          <Route path="blogs-list" element={<Bloglist />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="add-blog/:id" element={<AddBlog />} />
          <Route path="coupons-list" element={<CouponList />} />
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="add-coupon/:id" element={<AddCoupon />} />
          <Route path="blogs-category" element={<AddBlogCat />} />
          <Route path="blogs-category/:id" element={<AddBlogCat />} />
          <Route path="blogs-category-list" element={<BlogCatList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="category" element={<AddCat />} />
          <Route path="category/:id" element={<AddCat />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand/:id" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
