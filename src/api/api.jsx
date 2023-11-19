// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: '/', // Base URL for relative paths
    timeout: 5000, // Adjust the timeout value if needed
});

export default instance;
