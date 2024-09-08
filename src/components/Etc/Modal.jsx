import { useState, useEffect } from 'react';
import $common from '../../common';

export default function ({open, setOpen, data, reRender}) {
    const [imgNumber, setImgNumber] = useState(0);
    const imgList = data && data.imageList
    const imgId = [];
    const imgPath = [];
    if (imgList) {
        for (let img of imgList) {
            imgId.push(img.imageId);
            imgPath.push(img.imagePath);
        }
    }

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

    const changeImg = (input) => {
        let file = null;
        const label = input.parentElement;
        const localImg = label.nextSibling;
        if (input.files && (file=input.files[0])) {
            let reader = new FileReader();
            reader.onload = function (e) {
                console.log(e.target);
                localImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
            label.style.display = "none";
        } else {
            localImg.src = "";
            label.style.display = "block";
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
                        {/* img 0 */}
                        <div className={`pic-group ${imgNumber==0 ? "" : "fade"}`}>
                            <label>
                                <span className='fs-50 pointer'>+</span>
                                <input type="file" name='files' onChange={(e)=>changeImg(e.target)}/>
                            </label>
                            <img className={`img-id-${imgId[0]}`} 
                                    src={imgPath[0] && `${$common.href()}/image?path=${imgPath[0]}`} />
                            <input type="hidden" name='preImageId' defaultValue={imgId[0]}/>
                        </div>
                        {/* img 1 */}
                        <div className={`pic-group ${imgNumber==1 ? "" : "fade"}`}>
                            <label>
                                <span className='fs-50 pointer'>+</span>
                                <input type="file" name='files' onChange={(e)=>changeImg(e.target)}/>
                            </label>
                            <img className={`img-id-${imgId[1]}`} 
                                    src={imgPath[1] && `${$common.href()}/image?path=${imgPath[1]}`} />
                            <input type="hidden" name='preImageId' defaultValue={imgId[1]}/>
                        </div>
                        {/* img 2 */}
                        <div className={`pic-group ${imgNumber==2 ? "" : "fade"}`}>
                            <label>
                                <span className='fs-50 pointer'>+</span>
                                <input type="file" name='files' onChange={(e)=>changeImg(e.target)}/>
                            </label>
                            <img className={`img-id-${imgId[2]}`} 
                                    src={imgPath[2] && `${$common.href()}/image?path=${imgPath[2]}`} />
                            <input type="hidden" name='preImageId' defaultValue={imgId[2]}/>
                        </div>
                    </div> {/* modal-pic [End] */}

                    <div className='modal-info'>
                        <form name="DailyDataForm">
                            <h2 className='sel-date'>{data.date}</h2>
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
                </div>
            </div>
        </div>} </>
    )
}