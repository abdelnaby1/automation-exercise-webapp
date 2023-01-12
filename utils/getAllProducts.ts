import {request} from "@playwright/test"

export const getAllProducts = async() =>{
    const reqContext = await request.newContext();
    const res = await reqContext.get('https://automationexercise.com/api/productsList');
    const data = await res.json();
    return data.products;
}