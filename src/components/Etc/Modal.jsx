import { useState, useEffect } from 'react';
import $common from '../../common';

export default function ({open, setOpen, data, reRender}) {

    const imgList = data && data.imageList
    const imgId = [];
    const imgPath = [];
    if (imgList) {
        for (let img of imgList) {
            imgId.push(img.imageId);
            imgPath.push(img.imagePath);
        }
    }
    console.log(imgId, imgPath);

    const saveData = async () => {
        const f = new FormData(document.DailyDataForm);
        const files = document.querySelectorAll(".modal-files input");
        $common.setInputFilesInFormData(files, f);
        await $common.postDailyInfo(f);
        setOpen(false);
        reRender();
    }

    const updateData = async () => {
        const f = new FormData(document.DailyDataForm);
        const files = document.querySelectorAll(".modal-files input");
        $common.setInputFilesInFormData(files, f);
        await $common.patchDailyInfo(f);
        setOpen(false);
        reRender();
    }

    const deleteImage = async (event) => {
        if (!window.confirm("이미지가 즉시 삭제됩니다.\n삭제하시겠습니까?"))
            return ;
        const imageId = event.target.dataset.imageId;
        const f = new FormData();
        f.append("imageId", imageId);
        const success = await $common.deleteImage(f);
        if (success) {
            const tag = document.querySelector(`.img-id-${imageId}`);
            tag && (tag.src = "")   
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
                        {/* image */}
                    </div> {/* modal-pic [End] */}

                    <div className='modal-info'>
                        <form name="DailyDataForm">
                            <h2 className='sel-date'>{data.date}</h2>
                            <input type="hidden" name="date" value={data.date} />
                            <input type="hidden" name="noteId" value={data.noteId} />
                            <input type="hidden" name="moodId" value={data.moodId} />
                            <input type="hidden" name="dailyId" value={data.dailyId} />
                            <div className='modal-part'>
                                <label>
                                    <h5>기분:</h5>
                                    <select name="moodLevel" defaultValue={data.moodLevel}>
                                    <option value="">당신의 하루를 표현해주세요</option>
                                    <option value="100">환희</option>
                                    <option value="85">기쁨</option>
                                    <option value="70">만족</option>
                                    <option value="50">보통</option>
                                    <option value="30">우울</option>
                                    <option value="15">슬픔</option>
                                    <option value="0">절망</option>
                                    </select>
                                </label>
                            </div>
                            <div className='modal-part'>
                                <label>
                                    <h5>제목:</h5>
                                    <input type="text" name="noteTitle" defaultValue={data.noteTitle} />
                                    <i className='line'></i>
                                </label>
                            </div>
                            <div className='modal-part'>
                                <label>
                                    <h5>줄거리:</h5>
                                    <textarea name="noteContent" defaultValue={data.noteContent} />
                                </label>
                            </div>
                        </form>
                    </div> {/* modal-info [End] */}
                </div> {/* modal-body [End] */}
                <div className='modal-footer'>
                    <div className='modal-footer-right'>
                        <button onClick={()=>setOpen(false)}>
                            <i class='bx bxs-message-square-x'></i></button>
                        {data.dailyId == 0
                            ? <button onClick={()=>saveData()}>
                                <i class='bx bxs-message-square-check'></i></button>
                            : <button onClick={()=>updateData()}>
                                <i class='bx bxs-message-square-edit' ></i></button>
                        }
                    </div>
                </div>
            </div>
        </div>} </>
    )
}