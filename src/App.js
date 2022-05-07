import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './screens/home/HomePage';
import {Route, Routes} from 'react-router-dom';
import ProductPage from './screens/product/ProductPage';
import ProductDetailPage from './screens/product_detail/ProductDetailPage';
import ContactPage from './screens/contact/contactPage';
import CategoryPage from './screens/category/CategoryPage';
import LoginPage from './screens/login/LoginPage';
import RegisterPage from './screens/register/RegisterPage';
export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lien-he" element={<ContactPage />} />
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="/san-pham" element={<ProductPage />} />
                <Route path="/danh-muc/:slug-:id" element={<CategoryPage />} />
                <Route path="/san-pham/:slug-:id" element={<ProductDetailPage />} />
            </Routes>
            <Footer />
        </div>
    )
}
