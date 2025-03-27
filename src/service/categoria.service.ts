import { Categoria } from "../interface/categoria";

const API_URL = "http://localhost:3000/categoria";

const categoriaService = {
  getAll: async () => (await fetch(API_URL)).json(),
  
  create: async (categoria: Categoria) => (await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  })).json(),
  
  update: async (id: number, categoria: Categoria) => (await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoria),
  })).json(),
  
  delete: async (id: number) => fetch(`${API_URL}/${id}`, { method: "DELETE" }),
};

export default categoriaService;
