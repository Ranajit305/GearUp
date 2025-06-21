import { create } from 'zustand'
import { axiosUrl } from '../utils/axios'
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    user: null,
    userLoading: false,

    checkAuth: async () => {
        set({userLoading: true});
        try {
            const res = await axiosUrl.get("/user/auth");
            if (res.data.success) {
                set({ user: res.data.user });
            }
            
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({userLoading: false});
        }
    },

    signup: async (name, email, password) => {
        set({userLoading: true});
        try {
            const res = await axiosUrl.post('/user/signup', {name, email, password});
            if (res.data.success) {
                set({user: res.data.user});
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({userLoading: false});
        }
    },

    login: async (email, password) => {
        set({userLoading: true});
        try {
            const res = await axiosUrl.post('/user/login', {email, password});
            if (res.data.success) {
                set({user: res.data.user});
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({userLoading: false});
        }
    },

    logout: async () => {
        set({userLoading: true});
        try {
            const res = await axiosUrl.post('/user/logout');
            if (res.data.success) {
                set({user: null});
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({userLoading: false});
        }
    }
}))