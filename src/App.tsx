import { BrowserRouter, Route, Routes } from "react-router-dom";
import CrudCategorias from "./components/CrudCategorias";
import CrudProdutos from "./components/CrudProdutos";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<CrudCategorias />} />
        <Route path="/produtos" element={<CrudProdutos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
