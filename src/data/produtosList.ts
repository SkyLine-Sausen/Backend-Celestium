import type { Produtos } from "../types/Produtos.js";


export const productsList: Produtos[] = [
  // VIPS
  {
    id: "v1",
    name: "Vip Nobre",
    category: "vips",
    description:
      "Vip Nobre com itens dentro do jogo e tag especial",
    price: 24.90,
    image:
      "",
    badge: "Menos Pedido",
    available: true,
    tag: "Menos Pedido",
    rating: 4.8,
  },
  {
    id: "v2",
    name: "Vip Lord",
    category: "vips",
    description:
      "Vip Lord com itens dentro do jogo e tag especial",
    price: 34.90,
    image:
      "",
    badge: "Mais Pedido",
    available: true,
    tag: "Mais Pedido",
    rating: 7.2,
  },
  {
    id: "v3",
    name: "Vip Imperador",
    category: "vips",
    description:
      "Vip Imperador com itens dentro do jogo e tag especial",
    price: 49.90,
    image:
      "",
    badge: "Mais Pedido",
    available: true,
    tag: "Mais Pedido",
    rating: 10,
  },
];
