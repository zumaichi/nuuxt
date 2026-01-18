import { House, houses } from "~~/server/data/products";
import { Product } from "~/types/product";

export default defineEventHandler((event) => {
  const rawId = getRouterParam(event, "id");
  const id = parseInt(rawId || "", 10);

  // 400 for invalid IDs (missing, NaN, etc.)
  if (!rawId || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "id no valido",
    });
  }
  const product = houses.find((p: House) => p.id === id);

  // 404 if product not found
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "no se encuentra",
    });
  }
  return product;
});
