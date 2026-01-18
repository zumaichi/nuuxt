import { houses } from "~~/server/data/products";

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID no válido",
    });
  }

  const house = houses.find((h) => h.id === id);

  if (!house) {
    throw createError({
      statusCode: 404,
      statusMessage: "Casa no encontrada",
    });
  }

  return house;
});
