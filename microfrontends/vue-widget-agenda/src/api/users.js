const serviceName = 'springboot-agenda-api';
const getKeycloakToken = () => {
    if (window && window.entando
        && window.entando.keycloak
        && window.entando.keycloak.authenticated) {
        return window.entando.keycloak.token
    }
    return ''
}
export const fetchUsers = async (config) => {
    const jsonConfig = JSON.parse(config);
    const {api} = jsonConfig.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts`, {
            headers: {
                Authorization: `Bearer ${getKeycloakToken()}`,
                'Content-Type': 'application/json'
            },
        });
        if (res.ok) {
            const data = await res.json();
            return {
                responseType: 'OK',
                data: data
            };
        } else {
            return {responseType: 'ERROR'};
        }
    } catch (error) {
        return {responseType: 'ERROR'};
    }
};

export const postUser = async (config, user) => {
    const jsonConfig = JSON.parse(config);
    const {api} = jsonConfig.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contact`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getKeycloakToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (res.ok) {
            const data = await res.json();
            return {
                responseType: 'OK',
                data: data
            };
        } else {
            return {responseType: 'ERROR'};
        }
    } catch (error) {
        return {responseType: 'ERROR'};
    }
};

export const putUser = async (config, id, user) => {
    const jsonConfig = JSON.parse(config);
    const {api} = jsonConfig.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${getKeycloakToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...user, id})
        });
        if (res.ok) {
            const data = await res.json();
            return {
                responseType: 'OK',
                data: data
            };
        } else {
            return {responseType: 'ERROR'};
        }
    } catch (error) {
        return {responseType: 'ERROR'};
    }
};

export const deleteUser = async (config, id) => {
    const jsonConfig = JSON.parse(config);
    const {api} = jsonConfig.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getKeycloakToken()}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            return {responseType: 'OK'};
        } else {
            return {responseType: 'ERROR'};
        }
    } catch (error) {
        return {responseType: 'ERROR'};
    }
};
