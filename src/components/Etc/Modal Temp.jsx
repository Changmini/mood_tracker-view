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
            <div className="modal-content">
                <form name="DailyDataForm">
                    <h2>나의 하루</h2>
                    <h5>{data.date}</h5>
                    <input type="hidden" name="date" value={data.date} />
                    <input type="hidden" name="noteId" value={data.noteId} />
                    <input type="hidden" name="moodId" value={data.moodId} />
                    <input type="hidden" name="dailyId" value={data.dailyId} />
                    <div>
                        <label>
                            기분:
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
                    <div>
                        <label>
                            제목:
                            <input type="text" name="noteTitle" defaultValue={data.noteTitle} />
                        </label>
                    </div>
                    <div>
                        <label>
                            줄거리:
                            <textarea name="noteContent" defaultValue={data.noteContent} />
                        </label>
                    </div>
                </form>
                <div className='modal-files'>
                    <input type="file" name='files'/>
                    <input type="hidden" name='preImageId' defaultValue={imgId[0]}/>
                    <input type="button" data-image-id={imgId[0]} onClick={deleteImage} value="삭제"/>
                    <img className={`img-id-${imgId[0]}`} src={`${$common.href()}/image?path=${imgPath[0]}`} alt="Nothing"/>

                    <input type="file" name='files'/>
                    <input type="hidden" name='preImageId' defaultValue={imgId[1]}/>
                    <input type="button" data-image-id={imgId[1]} onClick={deleteImage} value="삭제"/>
                    <img className={`img-id-${imgId[1]}`} src={`${$common.href()}/image?path=${imgPath[1]}`} alt="Nothing"/>

                    <input type="file" name='files'/>
                    <input type="hidden" name='preImageId' defaultValue={imgId[2]}/>
                    <input type="button" data-image-id={imgId[2]} onClick={deleteImage} value="삭제"/>
                    <img className={`img-id-${imgId[2]}`} src={`${$common.href()}/image?path=${imgPath[2]}`} alt="Nothing"/>
                </div>
                {data.dailyId == 0
                    ? <button onClick={()=>saveData()}>저장</button>
                    : <button onClick={()=>updateData()}>수정</button>
                }
                {/* 삭제는 다른 공간에서 할 수 있도록 하자!! */}
                <button onClick={()=>setOpen(false)}>취소</button>
            </div>
        </div>} </>
    )
}