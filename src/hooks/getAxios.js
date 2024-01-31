import axios from "axios";

export const getAxios = axios.create({
    baseURL: "http:localhost:3000/api",
    timeout: 60000,
    headers: { contentType: "application/json" }
});
// export const privateRequest = axios.create({
//     baseURL: `${process.env.DOMAIN_API}/api/`,
//     timeout: 10000,
//     headers: { Accept: "application/json", token: `Bearer ${accessToken}` }
// });

/*instance.interceptors.request.use(config => {
    // Modify the request config before sending
    config.headers["X-Request-Id"] = "123456";
    return config;
});

instance.interceptors.response.use(response => {
    // Modify the response data before resolving the promise
    response.data = response.data.results;
    return response;
});*/

const handleLogin = async (username, password) => {
    try {
        const response = await api.post("/login", { username, password });

        // Assuming your login response contains an 'accessToken' field
        const accessToken = response.data.accessToken;

        // Set access token in headers for subsequent requests
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // You can also store the access token for future use, e.g., in AsyncStorage
        // AsyncStorage.setItem('accessToken', accessToken);

        return response;
    } catch (error) {
        throw error;
    }
};
