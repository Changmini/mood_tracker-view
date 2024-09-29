import { useState, useEffect } from 'react'
import $common from '../../common';
export default function Neighbor() {

    const oriList = [
        {
            nickname: "맹구리"
            ,description: "몬스터입니다."
        },{
            nickname: "클론구리"
            ,description: "저는 맹꽁2입니다."
        },{
            nickname: "해삼구리"
            ,description: "말미잘~~~~~"
        },{
            nickname: "구리구리"
            ,description: "아~ 우리 맹꽁이 변신상태"
        },{
            nickname: "힘듦"
            ,description: "이게 내 본심이다."
        },{
            nickname: "졸려핑"
            ,description: ""
        },{
            nickname: "가시핑"
            ,description: "가시가 되어~"
        },{
            nickname: "스머핑"
            ,description: "난 누구이지?"
        },{
            nickname: "가스레인지"
            ,description: ""
        },{
            nickname: "이불"
            ,description: "자고 싶어요~"
        },{
            nickname: "침대"
            ,description: ""
        },
    ]
    const [copyList, setCopyList] = useState([]);
    const [chatMsgList, setChatMsgList] = useState([]);

    const searchedList = (event) => {
        const word = event.target.value;
        const buckut = oriList.filter((obj) => {
            return obj['nickname'].includes(word);
        });
        setCopyList(buckut);
    }

    const sendChatMsg = () => {
        const INPUT = document.getElementById("myMsg");
        const _msg = INPUT.value;
        if (!_msg || _msg.trim() == "") 
            return ;
        const UL = document.getElementById("chatMsgGroup");
        const LI = document.createElement("li");
        const SPAN = document.createElement("SPAN");
        SPAN.className = "chat-msg";
        SPAN.innerText = _msg;
        LI.append(SPAN);
        LI.className = "chat-right";
        UL.append(LI);
    }

    useEffect(() => {
        const f = new FormData();
        setCopyList(oriList);
    }, []);

    return (<div className='neighbor-wrap'>
        <div className='neighbor-left'>
            <div className='search-nickname'>
                <input type="text" 
                    name='nickname' 
                    className='search-nick-ipt' 
                    placeholder='대상을 별칭으로 검색'/>
                <button type='button' 
                    className='search-nick-btn'>검색</button>
            </div>
            <div className='neighbor-list'>
                <section>
                    <input type="text" 
                        className='search-follower-list' 
                        placeholder='목록 검색'
                        onChange={searchedList}/>
                </section>
                
                <article>
                    <ul>
                        {copyList.map((element, i) => (
                            <li key={`nei-${i}`}>
                                <div> 
                                    <img /> 
                                </div>
                                <div>
                                    <span><h4>{element.nickname}</h4></span>
                                    <span>{element.description}</span>
                                </div>
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
                            <span className='chat-msg'>무슨무슨 글을 작성했어요~aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
                        </li>
                        <li className='chat-right'>
                            <span className='chat-msg'>무슨무슨 글을 작성했어요2222~</span>
                        </li>
                    </ul>
                </div>
                <div className='chat-input'>
                    <input type="text" id='myMsg' />
                    <button type='button' onClick={sendChatMsg}>
                        <i className='bx bx-send'></i>
                    </button>
                </div>
            </div>
        </div>
    </div>)
}