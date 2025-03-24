export const useToken = () => {
    const token = useCookie('token')

    const setToken = (newToken: string): void => {
        token.value = newToken;
    }

    const removeToken = () => {
        token.value = null;
    }

    return {
        token, setToken, removeToken
    }
}