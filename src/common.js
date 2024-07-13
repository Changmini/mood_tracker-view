import axios from 'axios';

const API_ROOT = "http://localhost/mood";
const methods = {
    _params: ["GET","PATCH","DELETE"],
    _data: ["POST"],
    httpRequest: async function(url, method, formData) {
        if (formData == null) 
            formData = {};

        let input = {};
        if (this._params.includes(method))
            input.params = formData;
        else if (this._data.includes(method))
            input.data = formData;

        const res = await axios({
            url: url,
            method: method,
            baseURL: API_ROOT,
            ... input
        });

        if (!res || res.status !== 200 || !res.data) {
            alert("잘못된 요청입니다. 관리자에게 문의하세요");
            return false;
        }

        return res.data;
    }

    /**
     * @description 
     * @param {*} id 
     * @returns {object} user
     */
    ,getUser : async function(id) {
        const data = await this.httpRequest(`/users/${id}`, "POST");
        return data;
    }

    ,getCalendar: async function(formData) {
        const data = await this.httpRequest("/calendar", "POST", formData);
        return data.dailyEntryList;
    }

    ,getDailyEntry: async function(formData) {
        const data = await this.httpRequest("/daily", "POST", formData);
        return data;
    }
}
export default methods;