import { useState, useEffect } from 'react'
import $common from '../../common';
import Calendar from './Calendar';
export default function Neighbor() {

    const [originalList, setOriginalList] = useState([]);
    const [copyList, setCopyList] = useState([]);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [neighborInfo, setNeighborInfo] = useState({});
    const [neighborId, setNeighborId] = useState(0);
    const [renewal, setRenewal] = useState(0);

    async function getNeighborList() {
        const list = await $common.getNeighbors(new FormData());
        if (!list) 
            return ;
        setOriginalList(list);
        setCopyList(JSON.parse(JSON.stringify(list)));
        setRenewal(renewal>=100 ? 0 : renewal+1);
    }

    const addNeighbor = async () => {
        const ipt = document.getElementById("nibNickname");
        if (!ipt || ipt.value.trim() == "") 
            return ;
        const f = new FormData();
        f.append("nickname", ipt.value);
        const success = await $common.addNeighbor(f);
        if (success) {
            ipt.value = "";
            getNeighborList();
        }
    }

    const clickNeighbor = (event) => {
        const li = event.currentTarget;
        const footer = li.childNodes[1];
        let klass = footer.className;
        if (klass.includes("fade")) {
            footer.className = klass.replace("fade","show-f");
        } else {
            footer.className = klass.replace("show-f","fade");
        }
    }

    const searchedList = (event) => {
        const word = event.target.value;
        const buckut = originalList.filter((obj) => {
            return obj['nickname'].includes(word);
        });
        setCopyList(buckut);
    }

    const disconn = async (obj) => {
        if (obj.synchronize=='N' 
            || !window.confirm("해당 사용자를 이웃 목록에서 제거하시겠습니까?"))
            return ;
        const f = new FormData();
        f.append("neighborId", obj.neighborId);
        const success = await $common.deleteNeighbor(f);
        if (success) {
            getNeighborList();
        }
    }

    const accept = async (obj) => {
        if (!window.confirm("해당 사용자를 이웃 목록에 추가하시겠습니까?"))
            return ;
        const f = new FormData();
        f.append("neighborId", obj.neighborId);
        f.append("synchronize", "Y");
        const success = await $common.syncRequest(f);
        if (success) {
            getNeighborList();
        }
    }

    const goNeighborCalendar = (obj) => {
        setNeighborInfo(obj);
        setOpenCalendar(true);
        const sidebar = document.querySelector(".sidebar");
        if (!sidebar.className.includes(" fade")) {
            sidebar.className += " fade";
        }
    }
    const closeNeighborCalendar = () => {
        setOpenCalendar(false);
        const sidebar = document.querySelector(".sidebar");
        if (sidebar.className.includes(" fade")) {
            sidebar.className = sidebar.className.replace(" fade", "");
        }
    }

    const hasCalExtAccess = async (obj) => {
        const f= new FormData();
        f.append("calExtAccess", obj.calExtAccess=='Y'?'N':'Y');
        f.append("neighborId", obj.neighborId);
        const success = await $common.hasCalExtAccess(f);
        if (success) {
            getNeighborList();
        }
    }

    function makeSpeechBubble(message, type) {
        const UL = document.getElementById("chatMsgGroup");
        const LI = document.createElement("li");
        const SPAN = document.createElement("SPAN");
        SPAN.className = "chat-msg";
        SPAN.innerText = message;
        LI.append(SPAN);
        LI.className = type=="R" ? "chat-right" : "chat-left";
        UL.append(LI);
        /* 스크롤 내리기 */
        SPAN.scrollIntoView({ // span 태크로 화면 이동시키기
            behavior: 'smooth' // 부드럽게 스크롤
        });
    }

    const goChatting = (obj) => {
        if (obj.synchronize=='N') {
            alert("맺어진 이웃이 아닙니다.");
            return ;
        }
        const _neighborId = obj.neighborId;
        const _sender = localStorage.getItem("NICKNAME");
        if (neighborId == _neighborId) {// 동일한 이웃인지 체크
            alert("이미 활성화된 채팅방입니다.");
            return ;
        }
        document.getElementById("chatMsgGroup").innerHTML = "";// 기존 글 지우기
        setNeighborId(_neighborId);// 새 이웃 선택
        if ($common.WebChat.isEmpty()) 
            alert("채팅방을 활성화합니다.");
        else 
            alert("채팅방을 전환합니다.");
        
        $common.WebChat.connect(// 채팅 시작
            makeSpeechBubble
            , _neighborId
            , _sender
        );
        
    }

    const sendChatMsg = () => {
        const INPUT = document.getElementById("myMsg");
        const _msg = INPUT.value;
        if (!_msg || _msg.trim() == "") 
            return ;
        INPUT.value = "";
        makeSpeechBubble(_msg, "R");
        $common.WebChat.sendMessage(
            neighborId
            ,localStorage.getItem("NICKNAME")
            ,_msg
        );
    }

    window.onbeforeunload = function() {
        $common.WebChat.close();
    };

    useEffect(() => {
        getNeighborList(); 
    }, []);

    return (<>
    <div className={`neighbor-wrap ${openCalendar?"fade":"show-f"}`}>
        <div className='neighbor-left'>
            <div className='search-nickname'>
                <input type="text"
                    id='nibNickname'
                    name='nickname' 
                    className='search-nick-ipt' 
                    placeholder='별칭으로 이웃 맺기'/>
                <button type='button' 
                    className='search-nick-btn' onClick={addNeighbor}>요청</button>
            </div>
            <div className='neighbor-list'>
                <section>
                    <input type="text" 
                        className='search-follower-list' 
                        placeholder='목록 검색'
                        onChange={searchedList}/>
                    <button onClick={getNeighborList}><i className='bx bx-refresh'></i></button>
                </section>
                
                <article>
                    <ul>
                        {copyList.map((element, i) => (
                        <li className={``+
                            `${element.requester=='Y' && element.synchronize=='N'? 'noting':''}`+
                            `${element.requester=='N' && element.synchronize=='N'? 'waiting':''}`+
                            `${element.synchronize=='Y'? 'approval':''}`+
                            `${element.chatroomActive=='Y' ? " blinking":""}`}
                            onClick={clickNeighbor}
                            key={`nei-${i}-${renewal}`}>
                            <div className=''>
                                <div>
                                    <img className={`${!element.imagePath || element.imagePath == "" ? "empty-profile":""}`}
                                        src={
                                            element.imagePath && element.imagePath != "" 
                                            && $common.getProfileImageUrl(element.imagePath)
                                    }/>
                                </div>
                                <div>
                                    <span><h4>{element.nickname}</h4></span>
                                    <span>{element.description}</span>
                                </div>
                            </div>
                            <footer className='neighbor-list-footer fade'>
                                <button className={`${element.synchronize=='N'? 'opacity01':''}`}
                                    onClick={()=>disconn(element)}>지우기</button>
                                <button className={`${element.requester=='Y' || element.synchronize=='Y'? 'opacity01':''}`}
                                    onClick={()=>accept(element)}>친구 맺기</button>
                                <button onClick={()=>goNeighborCalendar(element)}>달력보기</button>
                                <button onClick={()=>hasCalExtAccess(element)}>
                                    {`달력 ${element.calExtAccess=='Y'?"공개":"미공개"}`}</button>
                                <button onClick={()=>goChatting(element)}>채팅 요청/수락</button>
                            </footer>
                        </li>
                        ))}
                    </ul>
                </article>
            </div>
        </div>
        <div className="neighbor-right">
            <div>
                <div className='chat-msg-box'>
                    <ul id='chatMsgGroup'>
                        {/* <li className='chat-left'>
                            <span className='chat-msg'>sentence</span>
                        </li> */}
                    </ul>
                </div>
                <div className='chat-input'>
                    <textarea type="text" id='myMsg' />
                    <button type='button' onClick={sendChatMsg}>
                        <i className='bx bx-send'></i>
                    </button> 
                </div>
            </div>
        </div>
    </div>
    {openCalendar
        ? <div className='modal-calendar'><Calendar menu={'neighbor'}
            vo={neighborInfo}
            close={closeNeighborCalendar}
            /> </div>
        : <></>}
    </>)
}