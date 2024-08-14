import { useState, useEffect } from 'react';
import $common from '../../common';
export default function Timeline() {
    const LIMIT = 10;
    const [myLogList, setMyLogList] = useState([]);
    const [offset, setOffset] = useState(0);

    async function timelineRendering(formData) {
        const list = await $common.getDailyInfo(formData);
        setMyLogList([...myLogList, ...list]);
        console.log(list);
    }

    const addNewLog = () => {
        // 자연스럽게 추가된 로그를 이어붙이기
        // 렌더링을 최소화하는 방법은?
        const next = offset + LIMIT;
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", next);
        setOffset(next);
        timelineRendering(f);
    }
    
    useEffect(() => {
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", offset);
        timelineRendering(f);
    }, []);

    return (
        <div className="timeline">
            {myLogList.map((e) => (
                <div className="my-log" key={"tl"+e.date}>
                    {/* mood level을 색깔로 표현해준다. */}
                    <div className="picture">
                        {/* 있으면 보여주고 없으면 안보여준다. */}
                    </div>
                    <div className="note-title">
                        {e.noteTitle}
                    </div>
                </div>
            ))}
            <button className='show-new-log' onClick={
                () => addNewLog()
            }></button>
        </div>
    );
}