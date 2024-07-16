import { buildFilter } from "../../common/helper";
import { deleteMethod, getMethod, postMethod, putMethod } from "../baseService";

export const UserService = {
	async getDataList ( filters, isSet, setSearchParams )
	{
		const params = buildFilter( filters );
		if ( isSet )
		{
			setSearchParams( params )

		}
		return await getMethod( 'user', params );
	},
	
	async getDetailData(id) {
		return await getMethod('user/' + id);
	},
	async createData(data) {
		return await postMethod('user', data);
	},
	async putData(id,data) {
		return await putMethod('user/' + id, data);
	},
	async putBecomeOwnerData(id,data) {
		return await putMethod('user/become-owner/' + id, data);
	},
	async deleteData(id) {
		return await deleteMethod('user/' + id);
	},
}
