import { useState, useEffect } from 'react';
import $common from '../../common';
import Modal from '../Etc/Modal'

export default function Timeline({menu}) {
    const LIMIT = 10;
    const [offset, setOffset] = useState(0);
    const [dailyInfo, setDailyInfo] = useState([]);
    const [dailyInfoList, setDailyInfoList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [restriction, setRestriction] = useState(false);// offset 증가 방지
    const SearchInfo = {
        keyword : null,
        type : "title",
        option : [
            {value: "title", name: "제목"}
            ,{value: "content", name: "내용"}
        ]
    }

    /**
     * 타임라인에 배치할 일지 목록을 반환하는 함수
     * @param {*} formData limit, offset, title, content 등등
     * @param {*} clear 값이 true일 경우: 기존 목록 제거, 새로운 목록 반환
     * @returns 
     */
    async function updateTimeline(formData, clear=false) {
        const list = await $common.getDailyInfo(formData);

         if (list.length <= LIMIT) {
            // 현재 출력된 목록의 다음 페이지(데이터)가 없다.
            // addNewLog 비활성 목적
            setRestriction(true);
        }

        if (clear)
            setDailyInfoList(list);
        else 
            setDailyInfoList([...dailyInfoList, ...list]);
    }

    let EventStatus = null;
    function DebouncedSearch(callback, formData) {
        if (EventStatus) {
            clearTimeout(EventStatus);
        }

        EventStatus = setTimeout(async () => {
            let res = callback(formData, true);// updateTimeline()
            console.log(`검색 완료`, res.success);
        }, 1000);
    }

    const searching = (inputTagEvent) => {
        const e = inputTagEvent.target;
        const keyword = e.value;
        SearchInfo.keyword = keyword;

        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", 0);
        f.append(SearchInfo.type, SearchInfo.keyword);
        DebouncedSearch(updateTimeline, f);
    }

    function setSearchType(e) {
        const options = e.target.options;
        const op = options[options.selectedIndex];
        SearchInfo.type = op.value;

        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", 0);
        f.append(SearchInfo.type, SearchInfo.keyword);
        updateTimeline(f, true);
    }

    const addNewLog = () => {
        if (restriction) {// 추가할 데이터 없음
            return ;
        }
        // 자연스럽게 추가된 로그를 이어붙이기
        // 렌더링을 최소화하는 방법은?
        const next = offset + LIMIT;
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", next);
        f.append(SearchInfo.type, SearchInfo.keyword);
        setOffset(next);
        updateTimeline(f);
    }

    const openModal = (dailyInfo, event) => {
        const prevElement = document.querySelector(".timeline .timeline-sel");
        if (prevElement) {
            prevElement.className = prevElement.className.replace(" timeline-sel", "");
        }
        if (event) {
            event.currentTarget.className += ' timeline-sel';
        } 
        let copy = JSON.parse(JSON.stringify(dailyInfo));
        setDailyInfo(copy);
        setModalIsOpen(true);
    }

    async function reRendering() {
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", 0);// 처음부터 많은 데이터를 가져오는 것보다 0으로 리셋이 나은 것 같다.
        updateTimeline(f, true);
        setOffset(0);
        setRestriction(false);
    }

    useEffect(() => {
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", offset);
        updateTimeline(f);
    }, []);

    return (<>
        <div id='DailyLogSearch'>
            <select name="" id="" onChange={setSearchType}>
                {SearchInfo.option.map(e => {
                    return <option value={e.value} key={`dailyLog${e.value}`}>{e.name}</option>
                })}
            </select>
            <i className='bx bx-search'></i>
            <input name='searchKeyword' type="text" onChange={(e)=>{searching(e)}} placeholder="Search"/>
        </div>
        <div className="timeline">
            {dailyInfoList.map((e, idx) => (
                <div className={`container right`} key={"tl"+e.date}>
                    <div className="photo-album">
                        {e.imageList.map((img) => (
                            <img src={img.imagePath && img.imagePath!="" 
                                && `${$common.href()}/image?path=${img.imagePath}`}
                            key={"tli"+img.imageId} />
                        ))}
                    </div>
                    <div className="content" onClick={(event)=>openModal(e, event)}>
                        <h2>{e.date}</h2>
                        <p>{e.noteTitle}</p>
                    </div>
                </div>
            ))}
            <button className='show-new-log' onClick={
                () => addNewLog()
            }><i className='bx bxs-down-arrow'></i></button>
        </div>
        {/* =============================== 선택 날짜 상세보기 =============================== */}
        <Modal menu={menu}
            open={modalIsOpen} 
            setOpen={setModalIsOpen} 
            data={dailyInfo} 
            reRender={reRendering} />
    </>);
}