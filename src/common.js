import axios from 'axios';

const API_ROOT = "http://localhost/mood";
const methods = {
    href: function() { return API_ROOT },
    _params: ["GET"],
    _data: ["POST","PATCH","DELETE"],
    httpRequest: async function(url, method, formData) {
        if (!formData) 
            formData = new FormData();

        let input = {};
        if (this._params.includes(method))
            input.params = new URLSearchParams(formData);
        else if (this._data.includes(method))
            input.data = formData;

        const res = await axios({
            url: url,
            method: method,
            baseURL: API_ROOT,
            ... input
        });

        if (!res || res.status !== 200 || !res.data) {
            // alert("잘못된 요청입니다. 관리자에게 문의하세요");
            return false;
        }

        return res.data;
    }
    
    /**
     * @description 로그인 시도
     * @param 
     * @returns {boolean} success
     */
    ,login : async function(formData) {
        const data = await this.httpRequest(`/login`, "POST", formData);
        return data.success;
    }
    /**
     * @description 로그인 상태 확인
     * @param 
     * @returns {boolean} success
     */
    ,loginStatus : async function() {
        const data = await this.httpRequest(`/login/status`, "GET");
        return data.success;
    }
    /**
     * @description username 얻기
     * @param 
     * @returns {string} username
     */
    ,getUsername : async function() {
        const data = await this.httpRequest(`/user`, "GET");
        return data.success ? data.username : null;
    }

    ,getCalendar: async function(formData) {
        const daily = formData.get("date");
        const data = await this.httpRequest(`/calendar/${daily}`, "GET");
        return data.dailyInfoList;
    }

    ,getDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","GET", formData);
        return data.dailyInfoList;
    }

    ,postDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","POST", formData);
        return data.success;
    }

    ,patchDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","PATCH", formData);
        return data.success;
    }

    ,deleteDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","DELETE", formData);
        return data.success;
    }

    ,deleteImage: async function(formData) {
        const data = await this.httpRequest("/image","DELETE", formData);
        return data.success;
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

    ,setInputFilesInFormData: function(tag, formData) {
        tag && tag.forEach(e => {
            if (e.type === "file") {
                formData.append(e.name, e.files && e.files.length==1 ? e.files[0] : new File([],''));
            } else if (e.type !== "file") {
                formData.append(e.name, e.value);
            }
        });
    }
}
export default methods;