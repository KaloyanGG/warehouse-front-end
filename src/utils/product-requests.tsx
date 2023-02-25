import axios from "axios";

const baseUrl = "http://localhost:3000";

function getAllProducts() {
    return axios.get(baseUrl + "/products");
}

function getProductById(productId: string) {
    return axios.get(baseUrl + `/products/${productId}`)
}

export { getAllProducts, getProductById }