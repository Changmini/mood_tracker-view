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

    async function timelineRendering(formData) {
        const list = await $common.getDailyInfo(formData);
        if (list.length != LIMIT) {
            // 더 이상 뽑아올 데이터가 없다.
            setRestriction(true);
        }
        setDailyInfoList([...dailyInfoList, ...list]);
        console.log(dailyInfoList);
    }

    async function reRendering() {
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", 0);// 처음부터 많은 데이터를 가져오는 것보다 0으로 리셋이 나은 것 같다.
        const list = await $common.getDailyInfo(f);
        setDailyInfoList(list);
        setOffset(0);
        setRestriction(false);
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
        setOffset(next);
        timelineRendering(f);
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

    useEffect(() => {
        const f = new FormData();
        f.append("limit", LIMIT);
        f.append("offset", offset);
        timelineRendering(f);
    }, []);

    return (<>
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