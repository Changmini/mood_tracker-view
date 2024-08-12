import { useState, useEffect } from 'react';
import $common from '../../common';
export default function Timeline() {
    const [myLogList, setMyLogList] = useState([]);
    const [offset, setOffset] = useState(0);

    async function timelineRendering(formData) {
        const list = await $common.getDailyInfo(formData);
        setMyLogList(list);

        console.log(myLogList);
    }

    const addNewLog = () => {
        // 자연스럽게 추가된 로그를 이어붙이기
        // 렌더링을 최소화하는 방법은?
    }
    
    useEffect(() => {
        const f = new FormData();
        f.append("offset", 0);
        timelineRendering(f);
    }, []);

    return (
        <div className="timeline">
            {myLogList.map((e) => ( <>
                <div className="my-log">
                    {/* mood level을 색깔로 표현해준다. */}
                    <div className="picture">
                        {/* 있으면 보여주고 없으면 안보여준다. */}
                    </div>
                    <div className="note-title">
                        {e.noteTitle}
                    </div>
                </div>
                <hr/>
            </>))}
            <button className='show-new-log' onClick={
                () => addNewLog()
            }></button>
        </div>
    );
}