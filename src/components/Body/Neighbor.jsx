import { useState, useEffect } from 'react'
import $common from '../../common';
import Calendar from './Calendar';
export default function Neighbor() {

    const [originalList, setOriginalList] = useState([]);
    const [copyList, setCopyList] = useState([]);
    const [neighborInfo, setNeighborInfo] = useState({});
    const [openCalendar, setOpenCalendar] = useState(false);
    const [chatMsgList, setChatMsgList] = useState([]);

    async function getNeighborList() {
        const list = await $common.getNeighbors(new FormData()); console.log(list);
        if (!list) 
            return ;
        setOriginalList(list);
        setCopyList(JSON.parse(JSON.stringify(list)));
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
        if (!window.confirm("해당 사용자를 이웃 목록에서 제거하시겠습니까?"))
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

    const hasExternalAccessToCalendar = async (obj) => {
        const f= new FormData();
        f.append("externalAccess", obj.externalAccess=='Y'?'N':'Y');
        f.append("neighborId", obj.neighborId);
        const success = await $common.hasExternalAccessToCalendar(f);
        if (success) {
            getNeighborList();
        }
    }

    const sendChatMsg = () => {
        const INPUT = document.getElementById("myMsg");
        const _msg = INPUT.value;
        if (!_msg || _msg.trim() == "") 
            return ;
        INPUT.value = "";
        const UL = document.getElementById("chatMsgGroup");
        const LI = document.createElement("li");
        const SPAN = document.createElement("SPAN");
        SPAN.className = "chat-msg";
        SPAN.innerText = _msg;
        LI.append(SPAN);
        LI.className = "chat-right";
        UL.append(LI);
        /* 스크롤 내리기 */
        SPAN.scrollIntoView({ // span 태크로 화면 이동시키기
            behavior: 'smooth' // 부드럽게 스크롤
        });
    }

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
                            `${element.synchronize=='Y'? 'approval':''}`}
                            onClick={clickNeighbor}
                            key={`nei-${i}`}>
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
                                <button onClick={()=>hasExternalAccessToCalendar(element)}>
                                    {`달력 ${element.externalAccess=='Y'?"공개":"미공개"}`}</button>
                                <button>채팅 요청/수락</button>
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
                        <li className='chat-left'>
                            <span className='chat-msg'>무슨무슨 글을 작성했어요~aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                        </li>
                        <li className='chat-right'>
                            <span className='chat-msg'>무슨무슨 글을 작성했어요2222~</span>
                        </li>
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