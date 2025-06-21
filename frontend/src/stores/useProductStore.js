import { create } from "zustand"
import { axiosUrl } from "../utils/axios"
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
    products: [],
    productsLoading: false,

    getProducts: async (req, res) => {
        set({productsLoading: true});
        try {
            const res = await axiosUrl.get('/product');
            if (res.data.success) {
                set({products: res.data.products});
            }
        } catch (error) {
            console.log(error.resopnse.data.message);
        } finally {
            set({productsLoading: false});
        }
    },

    addProduct: async (name, type, description, image, additionalImages) => {
        set({productsLoading: true});
        try {
            const res = await axiosUrl.post('/product/add', {name, type, description, image, additionalImages})
            if (res.data.success) {
                set((state) => ({
                    products: [res.data.product, ...state.products]
                }));
            }
        } catch (error) {
            console.log(error.resopnse.data.message);
        } finally {
            set({productsLoading: false});
        }
    },

    enquireProduct: async (email, productId) => {
        set({productsLoading: true});
        try {
            const res = await axiosUrl.post(`/product/enquire/${productId}`, {email});
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
            toast.dismiss();
            toast.error(error.response.data.message);
        } finally {
            set({productsLoading: false});
        }
    }
}))