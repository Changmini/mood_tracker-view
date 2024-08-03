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
        const data = await this.httpRequest(`/users/${id}`, "GET");
        return data;
    }

    ,getCalendar: async function(formData) {
        const data = await this.httpRequest("/calendar", "GET", formData);
        return data.dailyInfoList;
    }

    ,getDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily", "GET", formData);
        return data;
    }

    ,postDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","POST", formData);
    }
    
    /**
     * @description Date 객체의 년,월,일 변경을 도와주는 함수 
     * @param {Date} date 날짜 오브젝트
     * @param {string} move < or >
     * @param {string} unit Y: 년, M: 월, D: 일
     * @param {boolean} recursive 재귀적 반복여부
     * @return 
     */
    ,changeDate: function(date, move, unit="M", recursive=true) {
        if (unit === "Y") {
            let y = date.getFullYear(); 
            date.setFullYear(y + move);
        } else if (unit === "M") {
            if (recursive) {
                let m = date.getMonth() + 1;
                move = m + move;
                move < 1 && this.changeDate(date, -1, "Y");
                move < 1 && this.changeDate(date, 12, "M", false);
                move < 1 && this.changeDate(date, move, "M");
            }
            move >= 1 && date.setMonth(move - 1);
        } else if (unit === "D") {
            if (recursive) {
                let d = date.getDate();
                move = d + move;
                move < 1 && this.changeDate(date, -1, "M");
                move < 1 && this.changeDate(date, (
                        new Date(date.getFullYear(), date.getMonth()+1, 0)
                    ).getDate(), "D", false);
                move < 1 && this.changeDate(date, move, "D");
            }
            move >= 1 && date.setDate(move);
        } else 
            console.error("common.js: changeDate()에서 요청을 수행할 수 없습니다.");
    }
}
export default methods;