import axios from "axios";

const baseUrl = "http://localhost:3000";

async function getAllUsers() {
    return await axios.get(baseUrl + "/users");
}

async function login({ username, password }: { username: string, password: string }) {
    return await axios.post(baseUrl + "/auth/login", { username, password }, {
        withCredentials: true
    });

}

export { getAllUsers, login }