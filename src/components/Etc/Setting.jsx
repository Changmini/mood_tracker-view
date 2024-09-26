import { useEffect, useState } from 'react';
import $common from '../../common';
export default function () {
    const [imagePath, setImagePath] = useState(null);
    const [nickname, setNickname] = useState("뽀또");
    const [description, setDescription] = useState("");
    const [sessionStatus, setSessionStatus] = useState("N");
    const [sharingCalendar, setSharingCalendar] = useState("N");

    async function getProfile(formData) {
        const res = await $common.getProfile(formData);
        if (!res) 
            return ;
        setImagePath($common.getImageUrl(res.imagePath));
        setNickname(res.nickname);
        setDescription(res.description);
        setSessionStatus(res.sessionStatus);
        setSharingCalendar(res.sharingCalendar);
    }

    const applySettingValue = () => {
        const f = new FormData(document.SettingForm);
        const success = $common.patchProfile(f);
        if (success) 
            alert(`적용되었습니다.`);
        else 
            alert(`오류가 발생했습니다.`);
    }

    const checkAlert = (event) => {
        if (window.confirm("새 이미지를 등록하시겠습니까?"))
            return ;
        event.preventDefault();
    }
    const changeImage = async (event) => {
        const f = new FormData();
        const ipt = event.currentTarget;
        if (!ipt || !ipt.files || !ipt.files.length ) {
            f.append("file", new File([],''));
        } else {
            f.append("file", ipt.files[0]);
        }
        const res = await $common.putProfileImage(f);
        if (res.success) {
            const PATH = $common.getImageUrl(res.imagePath);
            setImagePath(PATH);
        } else {
            alert(`프로필 이미지 변경에 실패했습니다. ${res.msg}`);
        }
    }

    const cancel = () => {
        const settingView = document.querySelector(".setting-wrap");
        const className = settingView.className;
        settingView.className = className.replace("dis-flex", "dis-none");
    }

    const notError = (event) => {
        const ipt = event.target
        ipt.checked = true;
    }

    useEffect(() => {
        const f = new FormData();
        getProfile(f);
    }, []);

    return (<div className='setting-wrap dis-none'>
        <div className='setting setting-div100'>
            <section className='setting-profile'>
                <div>
                    <label>
                        <img src={imagePath}/>
                        <input type='file' name='file' onClick={checkAlert} onChange={changeImage}/>
                    </label>
                </div>
                <div><h4>{nickname}</h4></div>
            </section>
            <section className='setting-config'> <form name='SettingForm'>
                <ul>
                    <li>
                        <label className='textarea' htmlFor="description">소개글</label>
                        <textarea name="description" defaultValue={description} maxLength={100}></textarea>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 접속 상태 : </span>
                            <label>
                                <input type="radio" value="Y" 
                                    name='sessionStatus' defaultChecked={sessionStatus=='Y'} />
                            온라인</label>
                            <label>
                                <input type="radio" value="N" 
                                    name='sessionStatus' defaultChecked={sessionStatus=='N'} />
                            오프라인</label>
                        </div>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 달력 정보 : </span>
                            <label>
                                <input type="radio" value="Y" 
                                    name='sharingCalendar' defaultChecked={sharingCalendar=='Y'} />
                            공개</label>
                            <label>
                                <input type="radio" value="N" 
                                    name='sharingCalendar' defaultChecked={sharingCalendar=='N'} />
                            비공개</label>
                        </div>
                    </li>
                </ul>
            </form> </section>
        </div>
        <div className='btn-group'>
            <button type='button' onClick={cancel}>
                <i className='bx bxs-message-square-x'></i></button>
            <button type='button' onClick={applySettingValue}>
                <i className='bx bxs-message-square-check'></i></button>
        </div>
    </div>);
}