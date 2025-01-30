import { useState, useEffect } from 'react';
import $common from '../../common';

export default function ({menu, open, setOpen, data, reRender}) {
    const isNeighborComponent = menu.includes("neighbor");
    const [imgNumber, setImgNumber] = useState(0);
    /**
     * moodList는 API를 통해서 정보를 받는 것이 맞는 것 같다
     * 히자만 다른 기능 개발보다 우선순위가 낮으니 뒤로 미루자
     * (나중에 Mood table 관련 정보를 저장해서 사용!!!)
     */
    const moodList = [
        {level: 100, icon: 'bx bx-cool'}
        ,{level: 85, icon: 'bx bx-laugh'}
        ,{level: 70, icon: 'bx bx-happy-alt'}
        ,{level: 50, icon: 'bx bx-smile'}
        ,{level: 30, icon: 'bx bx-confused'}
        ,{level: 15, icon: 'bx bx-tired'}
        ,{level: 0, icon: 'bx bx-dizzy'}
    ]
    const imgs = {
        cnt: 3
        ,src: []
        ,setList: function(_data) {
            const exist = _data && _data.imageList;
            if (exist) {
                const list = _data.imageList;
                for(let i=0; i<this.cnt; i++) {
                    let tid = list[i].imageId;
                    let tpath = list[i].imagePath;
                    tpath = tpath=="" ? null : tpath;
                    this.src.push({"id":tid, "path":tpath});
                }
            } else {
                for(let i=0; i<this.cnt; i++) {
                    this.src.push({"id":null, "path":null});
                }
            }
        }
    }
    imgs.setList(data);

    const saveData = async () => {
        if (!window.confirm("저장하시겠습니까?"))
            return;
        const f = new FormData(document.DailyDataForm);
        if (!f.get("moodLevel") || f.get("moodLevel") == "") {
            alert("당신의 기분 상태를 알려주세요.");
            return;
        }
        const files = document.querySelectorAll(".modal-pic input");
        $common.setInputFilesInFormData(files, f);
        await $common.addDailyInfo(f);
        setOpen(false);
        reRender();
    }

    const updateData = async () => {
        if (!window.confirm("수정하시겠습니까?"))
            return;
        const f = new FormData(document.DailyDataForm);
        if (!f.get("moodLevel") || f.get("moodLevel") == "") {
            alert("당신의 기분 상태를 알려주세요.");
            return;
        }
        const files = document.querySelectorAll(".modal-pic input");
        $common.setInputFilesInFormData(files, f);
        await $common.editDailyInfo(f);
        setOpen(false);
        reRender();
    }

    const deleteImage = async (index, imageId) => {
        if (isNeighborComponent) {
            return ;
        }
        const imgTag = document.querySelector(`.img-idx-${index} > img`);
        if (!imgTag || !imgTag.src || imgTag.src=="") 
            return ;
        const lblTag = document.querySelector(`.img-idx-${index} > label`);
        const iptTag = document.querySelector(`.img-idx-${index} > label > input`);
        if (!window.confirm("이미지가 즉시 삭제됩니다.\n삭제하시겠습니까?") || !lblTag || !iptTag)
            return ;
        if (imageId) {
            const f = new FormData();
            f.append("imageId", imageId);
            console.log(`서버에서 이미지 삭제 ${await $common.deleteImage(f)}`);
        }
        imgTag.removeAttribute("src");
        lblTag.className = lblTag.className.replace("fade","");
        if (iptTag.files && iptTag.files[0]) {
            iptTag.value = "";
        }
    }

    const changeImg = (input) => {
        if (isNeighborComponent) {
            return ;
        }
        let file = null;
        const label = input.parentElement;
        const localImg = label.nextSibling;
        if (input.files && (file=input.files[0])) {
            let reader = new FileReader();
            reader.onload = function (e) {
                localImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
            !label.className.includes("fade") && (label.className += "fade");
        } else {
            localImg.removeAttribute("src");
            label.className = label.className.replace("fade", "");
        }
    }

    return (
        <> {open && <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <button onClick={()=>setOpen(false)}>X</button>
                </div> {/* modal-header [End] */}
                
                <div className='modal-body'>
                    <div className='modal-pic'>
                        {imgs.src.map((img, idx) => { return (
                            <div className={`pic-group img-idx-${idx} ${imgNumber==idx ? "" : "fade"}`} key={`img-${idx}`}>
                                <label className={`${!img.path ? "" : "fade"}`}>
                                    <span className='fs-50 pointer'>+</span>
                                    <input type="file" name='files' onChange={(e)=>changeImg(e.target)}/>
                                </label>
                                <img src={$common.getImageUrl(img.path)}
                                    onClick={()=>deleteImage(idx, img.id)} />
                                <input type="hidden" name='preImageId' defaultValue={img.id}/>
                            </div>
                        )})}
                    </div> {/* modal-pic [End] */}

                    <div className='modal-info'>
                        <form name="DailyDataForm">
                            <h2 className='sel-date'>{data.date}</h2>
                            <div className='modal-part'>
                                <label>
                                    <h5>기분:</h5>
                                    <div className="expr">
                                    {moodList.map((m) => { return (
                                        <div key={`expr-${m.level}`}>
                                            <input id={`expr${m.level}`} 
                                                type="radio" 
                                                name='moodLevel' 
                                                value={m.level} 
                                                hidden
                                                defaultChecked={data.moodLevel == m.level}
                                            />
                                            <label htmlFor={`expr${m.level}`} >
                                                <i className={m.icon}></i>
                                            </label>
                                        </div>
                                    )})}
                                    </div>
                                </label>
                            </div>
                            <div className='modal-part'>
                                <label>
                                    <h5>제목:</h5>
                                    <input className='txt3' type="text" name="noteTitle" defaultValue={data.noteTitle} />
                                    <i className='line'></i>
                                </label>
                            </div>
                            <div className='modal-part'>
                                <label>
                                    <h5>줄거리:</h5>
                                    <textarea className='txt3' name="noteContent" defaultValue={data.noteContent} />
                                </label>
                            </div>
                            <input type="hidden" name="date" value={data.date} />
                            <input type="hidden" name="noteId" value={data.noteId} />
                            <input type="hidden" name="moodId" value={data.moodId} />
                            <input type="hidden" name="dailyId" value={data.dailyId} />
                        </form>
                    </div> {/* modal-info [End] */}
                </div> {/* modal-body [End] */}
                <div className='modal-footer'>
                    <div className='modal-footer-left'>
                        <button onClick={()=>setImgNumber(0)}>
                        {imgNumber==0 
                            ? <i className='bx bxs-circle'></i>
                            : <i className='bx bx-circle'></i>}</button>
                        <button onClick={()=>setImgNumber(1)}>
                        {imgNumber==1 
                            ? <i className='bx bxs-circle'></i>
                            : <i className='bx bx-circle'></i>}</button>
                        <button onClick={()=>setImgNumber(2)}>
                        {imgNumber==2 
                            ? <i className='bx bxs-circle'></i>
                            : <i className='bx bx-circle'></i>}</button>
                    </div>
                    {!isNeighborComponent ? 
                        <div className='modal-footer-right'>
                            <button onClick={()=>setOpen(false)}>
                                <i className='bx bxs-message-square-x'></i></button>
                            {data.dailyId == 0
                                ? <button onClick={()=>saveData()}>
                                    <i className='bx bxs-message-square-check'></i></button>
                                : <button onClick={()=>updateData()}>
                                    <i className='bx bxs-message-square-edit' ></i></button>
                            }
                        </div>
                    : <></>}
                </div>
            </div>
        </div>} </>
    )
}