import { STORED_AUTH_TOKEN } from "./Constants"

export function checkAuth() {
    const token = localStorage.getItem(STORED_AUTH_TOKEN)
    return token !== null && token !== ''
}
