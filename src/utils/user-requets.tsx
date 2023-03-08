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

async function register({ username, password, repeatPassword }: { username: string, password: string, repeatPassword: string }) {
    // return axios.post(baseUrl + "/auth/register", { username, password, repeatPassword });

    return await fetch(baseUrl + "/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, repeatPassword })
    });

}


async function whoAmI() {
    try {
        const response = await fetch('http://localhost:3000/me',
            {
                credentials: 'include'
            });
        if (response.status === 401) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (e: any) {
        throw new Error(e);
    }
}

export { getAllUsers, login, register, whoAmI }