import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './screens/home/HomePage';
import {Route, Routes} from 'react-router-dom';
import ProductPage from './screens/product/ProductPage';
import ProductDetailPage from './screens/product_detail/ProductDetailPage';
export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/san-pham" element={<ProductPage />} />
                <Route path="/san-pham/:slug-:id" element={<ProductDetailPage />} />
            </Routes>
            <Footer />
        </div>
    )
}
