import { buildFilter } from "../../common/helper";
import { deleteMethod, getMethod, postMethod, putMethod } from "../baseService";

export const VoteService = {
	async getDataList ( filters, isSet, setSearchParams )
	{
		const params = buildFilter( filters );
		if ( isSet )
		{
			setSearchParams( params )

		}
		return await getMethod( 'vote', params );
	},
	
	async getDetailData(id) {
		return await getMethod('vote/' + id);
	},
	async createData(data) {
		return await postMethod('vote', data);
	},
	async putData(id,data) {
		return await putMethod('vote/' + id, data);
	},

	async deleteData(id) {
		return await deleteMethod('vote/' + id);
	},
}