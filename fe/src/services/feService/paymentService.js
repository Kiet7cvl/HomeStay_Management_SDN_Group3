
import axios from "axios"

export const getConfig = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}api/payments/config`)
    return res.data
}

export default { getConfig };