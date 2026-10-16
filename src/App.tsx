// IA-07
import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { ROUTES } from './constants/routes';
import { CartPage } from './pages/CartPage';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { NewProductPage } from './pages/NewProductPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.catalog} element={<CatalogPage />} />
        <Route path={ROUTES.product} element={<ProductPage />} />
        <Route path={ROUTES.cart} element={<CartPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.newProduct} element={<NewProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
