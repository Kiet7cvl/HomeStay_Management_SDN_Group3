import axiosClient from "./axiosClient";
import { buildFilter } from "../services/common";

const userService = {

	async getLists(params) {
        try {
            let filters = buildFilter(params);
		    return await axiosClient.get(`user`, {params: filters});
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async getListUser(params) {
        try {
            let filters = buildFilter(params);
		    return await axiosClient.get(`user`, {params: filters});
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async findById(id) {
        try {
            return await axiosClient.get(`user/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
    },

    async create(data) {
        try {
		    return await axiosClient.post(`user/store`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async update(id, data) {
        try {
		    return await axiosClient.put(`user/update/${id}`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async delete(id) {
        try {
		    return await axiosClient.delete(`user/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

}

export default userService;
