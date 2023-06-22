const serviceName = 'springboot-agenda-api';

export const fetchUsers = async (config, token, handleAddToast) => {
    const {api} = config.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
            handleAddToast('Error reading users', 'error');
            return {responseType: 'ERROR'};
        }
    } catch (error) {
        return {responseType: 'ERROR'};
    }
};

export const postUser = async (config, token, user) => {
    const {api} = config.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contact`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
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

export const putUser = async (config, token, id, user) => {
    const {api} = config.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
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

export const deleteUser = async (config, token, id) => {
    const {api} = config.systemParams;
    try {
        const res = await fetch(`${api[serviceName].url}/api/contacts/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
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
