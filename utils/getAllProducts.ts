import { request } from "@playwright/test";

export const getAllProducts = async () => {
  const reqContext = await request.newContext();
  const res = await reqContext.get(
    "https://automationexercise.com/api/productsList"
  );
  const data = await res.json();
  return data.products;
};

export const getsRnadomProductName = async () => {
  const reqContext = await request.newContext();
  const res = await reqContext.get(
    "https://automationexercise.com/api/productsList"
  );
  const data = await res.json();
  let randomIndex = -1;
  if (data.products.length) {
    randomIndex = Math.floor(Math.random() * data.products.length);
  }
  return data.products[randomIndex].name;
};
