import axiosClient from "./axiosClient";
import { buildFilter } from "./common";

const voteService = {

	async getLists(params) {
        try {
            let filters = buildFilter(params);
		    return await axiosClient.get(`vote/`, {params: filters});
        } catch (error) {
			console.log('error----------> ', error);
            return {
                status: 'error'
            }
        }
	},

    async findById(id) {
        try {
            return await axiosClient.get(`vote/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
    },

    async create(data) {
        try {
		    return await axiosClient.post(`vote/store`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async update(id, data) {
        try {
		    return await axiosClient.put(`admin/category/update/${id}`, data);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

    async delete(id) {
        try {
		    return await axiosClient.delete(`admin/category/${id}`);
        } catch (error) {
            return {
                status: 'error'
            }
        }
	},

}

export default voteService;
