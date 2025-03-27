import { Produto } from "../interface/produto";

const API_URL = "http://localhost:3000/produto";

export const produtoService = {
  getAll: async () => (await fetch(API_URL)).json(),

  getById: async (id: number) => (await fetch(`${API_URL}/${id}`)).json(),

  create: async (produto: Produto) =>
    (
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      })
    ).json(),

  update: async (id: number, produto: any) =>
    (
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      })
    ).json(),

  delete: async (id: number) => fetch(`${API_URL}/${id}`, { method: "DELETE" }),
};

export default produtoService;
