import axios from "axios";
import { Product } from "../interfaces/product-interface";

const baseUrl = "http://localhost:3000";

async function getAllProducts() {

    return await fetchWithToken(baseUrl + "/products", {});

}

async function getProductById(productId: string) {
    try {
        const response = await fetchWithToken(baseUrl + `/products/${productId}`, {});
        const product = await response.json();
        return product;
    } catch (error) {
        return null;
    }

}

async function updateProduct(product: Product) {

    return await fetchWithToken(baseUrl + `/products/${product._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

}

async function addProduct(product: any) {

    return await fetchWithToken(baseUrl + `/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

}

async function deleteProduct(productId: string) {
    const response = await fetchWithToken(baseUrl + `/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
    });

    return response;
}

async function fetchWithToken(url: string, options: RequestInit): Promise<Response> {
    let response = await fetch(url, { ...options, credentials: "include" });
    if (response.status === 401) {
        const renewedToken = await renewToken();
        if (renewedToken) {
            response = await fetch(url, { ...options, credentials: "include" });
        }
    }
    return response;
}

async function renewToken(): Promise<boolean> {
    const response = await fetch(baseUrl + '/auth/token', {
        method: "POST",
        credentials: "include",
    });
    return response.status === 200;
}




export { getAllProducts, getProductById, updateProduct, addProduct, deleteProduct }