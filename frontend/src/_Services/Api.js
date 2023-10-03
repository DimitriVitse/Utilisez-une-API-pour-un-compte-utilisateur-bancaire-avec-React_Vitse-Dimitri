import axios from 'axios';
import { selectUser, actions } from '@/Redux/Reducers/Index';

// Configure the base URL for your API
axios.defaults.baseURL = 'http://localhost:3001/api/v1/user/';

export const fetchOrUpdateToken = async (store, email, password) => {
    const { tokenStatus, rememberMe } = selectUser(store.getState());

    if (tokenStatus === 'pending' || tokenStatus === 'updating') {
        return;
    }

    store.dispatch(actions.tokenFetching());

    try {
        const response = await axios.post('login', { email, password });
        const { body } = response.data;

        store.dispatch(actions.tokenResolved(body.token));

        if (rememberMe) {
            localStorage.setItem('token', body.token);
            sessionStorage.setItem('token', body.token);
        }

        return body.token;
    } catch (error) {
        console.log(typeof error);
        store.dispatch(actions.tokenRejected(error));
        return null;
    }
};

export const fetchOrUpdateData = async (store, token) => {
    if (token === null) {
        return;
    }

    const dataStatus = selectUser(store.getState()).dataStatus;

    if (dataStatus === 'pending' || dataStatus === 'updating') {
        return;
    }

    store.dispatch(actions.dataFetching());

    try {
        const response = await axios.post('profile', null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { body, status } = response.data;

        if (status === 401) {
            signOut(store);
            return;
        }

        store.dispatch(actions.dataResolved(body));
    } catch (error) {
        store.dispatch(actions.dataRejected(error));
    }
};

export const checkStorageToken = (store) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
        store.dispatch(actions.tokenFetching());
        store.dispatch(actions.tokenResolved(token));
        fetchOrUpdateData(store, token);
        store.dispatch(actions.remember());
    }
};

export const signOut = (store) => {
    store.dispatch(actions.logout());
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

export const rememberMe = (store) => {
    store.dispatch(actions.remember());
};

export const editProfil = async (store, firstName, lastName, token) => {
    try {
        await axios.put(
            'profile',
            { firstName, lastName },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        store.dispatch(actions.editProfil(firstName, lastName));
    } catch (error) {
        store.dispatch(actions.dataRejected(error));
    }
};
