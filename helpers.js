import { API_URL } from "./Config";

export async function fetchPublishableKey() {
    try {
        console.log("sup");

        const response = await fetch(`${API_URL}/config`);
        const { publishableKey } = response.json();
        return publishableKey;
    } catch (e) {
        console.log(e);
        console.warn('Unable to fetch publishable key');
    }
} 