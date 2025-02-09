import axios from 'axios';

const API_PROTOCOL = "http://";
const API_HOST = "localhost";
//const API_HOST = "3.38.99.65";
const API_PATHNAME = "/mood"
const API_ROOT = `${API_PROTOCOL}${API_HOST}${API_PATHNAME}`;
const methods = {
    href: function() { return API_ROOT },

    _params: ["GET"],
    _data: ["POST","PATCH","PUT","DELETE"],
    httpRequest: async function(url, method, formData) {
        if (!formData) 
            formData = new FormData();

        let input = {};
        if (this._params.includes(method))
            input.params = new URLSearchParams(formData);
        else if (this._data.includes(method))
            input.data = formData;

        const res = await axios({
            url: `${API_ROOT}${url}`,
            method: method,
            ... input
        });

        if (!res || res.status != 200 || !res.data) {
            // alert("잘못된 요청입니다. 관리자에게 문의하세요");
            return false;
        }

        return res.data;
    }
    
    /**
     * @description 로그인
     * @param 
     * @returns {boolean} success
     */
    ,login : async function(formData) {
        const data = await this.httpRequest(`/login`, "POST", formData);
        return data;
    }
    /**
     * @description 로그아웃
     * @param 
     * @returns {boolean} success
     */
    ,logout : async function() {
        const data = await this.httpRequest(`/logout`, "POST");
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
    ,postUser : async function (formData) {
        const data = await this.httpRequest(`/user`, "POST", formData);
        return data;
    }
    /**
     * @description username 얻기
     * @param 
     * @returns {string} username
     */
    ,getUserInfo : async function() {
        const data = await this.httpRequest(`/user`, "GET");
        return data.success ? data : null;
    }

    ,getCalendar: async function(formData) {
        const date = formData.get("date");
        const data = await this.httpRequest(`/calendar/${date}`, "GET");
        return data.dailyInfoList;
    }
    ,getDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","GET", formData);
        return data.dailyInfoList;
    }
    ,addDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","POST", formData);
        return data.success;
    }
    ,editDailyInfo: async function(formData) {
        const data = await this.httpRequest("/daily","PUT", formData);
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
    ,getGraphData: async function(formData) {
        const data = await this.httpRequest("/graph/mood-level-data","GET", formData);
        return data.graph;
    }
    ,getProfile: async function() {
        const data = await this.httpRequest("/user/profile","GET");
        return data.profile;
    }
    ,editProfile: async function(formData) {
        const data = await this.httpRequest("/user/profile","PATCH", formData);
        return data.success;
    }
    ,putProfileImage: async function(formData) {
        const data = await this.httpRequest("/user/profile/image","PUT", formData);
        return data;
    }
    ,getNeighbors: async function(formData) {
        const data = await this.httpRequest("/neighbors","GET", formData);
        return data.neighbors;
    }
    ,addNeighbor: async function(formData) {
        const nickname = formData.get("nickname");
        const data = await this.httpRequest(`/neighbor/${nickname}`,"POST", formData);
        return data.success;
    }
    ,syncRequest: async function(formData) {
        const data = await this.httpRequest(`/neighbor/synchronize`,"PATCH", formData);
        return data.success;
    }
    ,editNeighbor: async function(formData) {
        const data = await this.httpRequest(`/neighbor`,"PATCH", formData);
        return data.success;
    }
    ,deleteNeighbor: async function(formData) {
        const data = await this.httpRequest(`/neighbor`,"DELETE", formData);
        return data.success;
    }
    ,getNeighborCalendar: async function(formData) {
        const neighborId = formData.get("neighborId");
        const date = formData.get("date");
        const data = await this.httpRequest(`/neighbor/${neighborId}/calendar/${date}`,"GET");
        return data.dailyInfoList;
    }
    ,hasCalExtAccess: async function(formData) {
        const data = await this.httpRequest(`/neighbor`,"PATCH", formData);
        return data.success;
    }


    /* ====================================================================== */
    /* =============================== [Util] =============================== */
    /* ====================================================================== */
    /**
     * @description 로딩 아이콘을 띄우거나 숨긴다.
     * @param show
     */
    ,loading: function(show) {
        if (!document) 
            return ;
        const loading = document.querySelector(".loading-wrap");
        if (show)
            loading.className = loading.className.replace("fade", "show-f");
        else 
            loading.className = loading.className.replace("show-f", "fade");
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

    ,getImageUrl(path) {
        if (!path || path == "")
            return ;
        return `${API_ROOT}/image?path=${encodeURIComponent(path)}`;
    }
    ,getProfileImageUrl(path) {
        if (!path || path == "")
            return ;
        return `${API_ROOT}/profile-image?path=${encodeURIComponent(path)}`;
    }

    ,setInputFilesInFormData: function(tag, formData) {
        tag && tag.forEach(e => {
            if (e.type === "file") {
                formData.append(e.name, e.files && e.files.length==1 ? e.files[0] : new File([],''));
            } else if (e.type != "file") {
                formData.append(e.name, e.value);
            }
        });
    }

    /**
     * 분석표에서 차트의 색깔을 랜덤으로 지정해주는 함수
     * @param 
     * @return string rgb(x,x,x)
     */
    ,getRandomColor: function() {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        return [`rgb(${red}, ${green}, ${blue})`, `rgba(${red}, ${green}, ${blue}, 0.5)`];
    }

    /**
     * 분석표에서 차트 제작에 사용되는 데이터
     */
    ,chartDefaultOption: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {
                display: true,
                text: '제목 설정',
            },
        },
    }

    /**
     * 계정 생성 페이지에서 입력된 이메일 형식을 체크하는 함수
     * @param string email
     * @return object { msg, success }
     */
    ,checkEmail: function(email) {
        const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        if (EMAIL_REGEX.test(email)) {
            return {
                msg: "유효한 이메일 주소입니다.",
                success: true
            }
        } else {
            return {
                msg: "유효하지 않은 이메일 주소입니다.",
                success: false
            };
        }
    }

    /**
     * Setting 프로필 이미지 정보를 Sidebar 프로필 이미지에 적용하기 위한 알림 객체
     */
    ,profileImage: {
        receiver: null
        ,itemKey: ''
        ,init: function(callback, name) {
            this.receiver = callback;
            this.itemKey = name;
        }
        ,set option(data) {
            localStorage.setItem(this.itemKey, data);
            this.receiver(data);
        }
    }

    /**
     * WebSocket을 통한 통신을 관장하는 서비스 객체
     * 이웃찾기 메뉴에서 사용
     */
    ,WebChat: {
        socket: null
        ,connect: function(showMessage, neighborId, sender) {
            if (this.socket && this.socket.readyState == this.socket.OPEN) {// 이미 통신하는 소켓이 존재하면 닫아주기
                this.socket.close();
            }
            this.socket = new WebSocket(// 소켓 연결 시도
                `ws://${API_HOST}${API_PATHNAME}/chat?neighborId=${neighborId}&sender=${sender}`
            );
            const that = this;
            this.socket.onopen = function() {// 소켓 연결 후
                const json = {
                    "neighborId": neighborId
                    ,"time": (new Date).toISOString().substring(0,19).replace("T"," ")
                    ,"sender": sender
                    ,"content": `입장하셨습니다.`
                }
                that.socket.send(JSON.stringify(json));
            };
            this.socket.onmessage = function(event) {// 메시지 받기
                const json = JSON.parse(event.data);
                if (!json.sender) {
                    const _msg = `${json.content}`;
                    showMessage(_msg, "R");
                } else {
                    const _msg = `${json.sender} (${json.time})\n${json.content}`;
                    showMessage(_msg, "L");
                }
            }
        }
        /**
         * @param {number} neighborId
         * @param {string} sender
         * @param {string} content
         */
        ,sendMessage: function(neighborId, sender, content) {
            const json = {
                "neighborId": neighborId
                ,"time": (new Date).toISOString().substring(0,19).replace("T"," ")
                ,"sender": sender
                ,"content": content
            }
            this.socket.send(JSON.stringify(json));
        }
        ,isEmpty: function() {
            return (this.socket == undefined || this.socket == null);
        }
        ,close: function() {
            if (this.socket) this.socket.close();
        }
    }
    ,
}
export default methods;