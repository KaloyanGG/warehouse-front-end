import axios from "axios";
import { Product } from "../interfaces/product-interface";

const baseUrl = "http://localhost:3000";

function getAllProducts() {
    return axios.get(baseUrl + "/products");
}

async function getProductById(productId: string) {

    try {
        const response = await fetch(baseUrl + `/products/${productId}`);
        const product = await response.json();
        return product;
    } catch (error) {
        return null;
    }

}

async function updateProduct(product: Product) {

    return await fetch(baseUrl + `/products/${product._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

}

async function addProduct(product: any) {

    return await fetch(baseUrl + `/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

}

async function deleteProduct(productId: string) {

    return await fetch(baseUrl + `/products/?id=${productId}`, {
        method: "DELETE",
        credentials: "include",
    });


}





export { getAllProducts, getProductById, updateProduct, addProduct, deleteProduct }