import axios from "axios";

const baseUrl = "http://localhost:3000";

function getAllProducts() {
    return axios.get(baseUrl + "/products", {
        headers: {

        }
    });
}

export { getAllProducts }