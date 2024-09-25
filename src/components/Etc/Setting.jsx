import { useEffect, useState } from 'react';
import $common from '../../common';
import userEvent from '@testing-library/user-event';
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
        setImagePath(res.imagePath);
        setNickname(res.nickname);
        setDescription(res.description);
        setSessionStatus(res.sessionStatus);
        setSharingCalendar(res.sharingCalendar);
    }

    useEffect(() => {
        const f = new FormData();
        getProfile(f);
    }, []);

    const test = () => {
        console.log("동작 확인");
    }

    return (<div className='setting-wrap'>
        <div className='setting setting-div100'>
            <section className='setting-profile'>
                <div>
                    <label>
                        <img />
                        <input type='file' name='file' onClick={test}/>
                    </label>
                </div>
                <div><h5>{nickname}</h5></div>
            </section>
            <section className='setting-config'>
                <ul>
                    <li>
                        <label className='textarea' htmlFor="description">소개글</label>
                        <textarea name="description" defaultValue={description} maxLength={100}></textarea>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 접속 상태 : </span>
                            <label>
                                <input type="radio" value="Y" name='sessionStatus' defaultChecked={sessionStatus=='Y'}/>
                            온라인</label>
                            <label>
                                <input type="radio" value="N" name='sessionStatus' defaultChecked={sessionStatus=='N'}/>
                            오프라인</label>
                        </div>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 달력 정보 : </span>
                            <label>
                                <input type="radio" value="Y" name='sharingCalendar' defaultChecked={sharingCalendar=='Y'}/>
                            공개</label>
                            <label>
                                <input type="radio" value="N" name='sharingCalendar' defaultChecked={sharingCalendar=='N'}/>
                            비공개</label>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>);
}