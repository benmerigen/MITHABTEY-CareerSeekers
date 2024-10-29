
/**
 * Fetch with authentication
 * This function is used to make authenticated requests to the server.
 * It adds the necessary headers to the request to include the user's authentication token.
 * If the request fails due to an expired token, the user is redirected to the sign-in page.
 * @param url - The URL to make the request to
 * @param options - The request options
 * @returns The response from the server
 * @throws An error if the request fails
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {


    options.credentials = 'include';
    const response = await fetch(url, options);
    if ( response.status === 401) {
        localStorage.removeItem('persist:root');
        wait(10000);
        window.location.href = '/signin';
    }
    if (!response.ok) {
        // Handle error response globally, if necessary
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
};

function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

