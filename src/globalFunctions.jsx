const userCookie = document.cookie;

// Extract user information from cookies
export const parsedCookie = userCookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
}, {});