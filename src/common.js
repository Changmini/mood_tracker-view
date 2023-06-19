import axios from 'axios';

const methods = {
    /**
     * @description 
     * @param {*} id 
     * @returns {object} user
     */
    getUser : async (id) => {
        const res = await axios.get('/users/' + id);
        if (res.status !== 200) { 
            console.error(res.status);
            alert("서버 관리자한테 문의하세요");
        }
        return res.data;
    }
}
export default methods;