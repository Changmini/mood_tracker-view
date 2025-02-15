import { useEffect, useState } from 'react';
import $common from '../../common';
import { Form } from 'react-router-dom';
export default function () {
    const [imagePath, setImagePath] = useState(null);
    const [nickname, setNickname] = useState("Error");
    const [description, setDescription] = useState("");
    const [sessionStatus, setSessionStatus] = useState("N");
    const [sharingCalendar, setSharingCalendar] = useState("N");
    const [htmlUpdated, setHtmlUpdated] = useState(0);
    const [apiToken, setApiToken] = useState("");

    async function getProfile(formData) {
        const res = await $common.getProfile(formData);
        if (!res) 
            return ;
        setImagePath($common.getImageUrl(res.imagePath));
        setNickname(res.nickname);
        setDescription(res.description);
        setSessionStatus(res.sessionStatus);
        setSharingCalendar(res.sharingCalendar);
        if (htmlUpdated >= 1000) {
            setHtmlUpdated(0);
        }
        setHtmlUpdated(htmlUpdated+1);
    }
    async function getApiToken() {
        const token = await $common.getApiKey();
        if (!token) 
            return ;
        setApiToken(token);
    }
    async function updateApiToken() {
        if (!window.confirm("기존 API 토큰은 사라지게 됩니다. 재갱신하시겠습니까?"))
            return ;
        const token = await $common.updateApiKey();
        if (!token) return ;
        setApiToken(token);
    }

    const applySettingValue = () => {
        const f = new FormData(document.SettingForm);
        const success = $common.editProfile(f);
        if (success) 
            alert(`적용되었습니다.`);
        else {
            alert(`오류가 발생했습니다.`);
            refresh();
        }
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
            $common.profileImage.option = res.imagePath;
            setImagePath(PATH);
        } else {
            alert(`프로필 이미지 변경에 실패했습니다. ${res.msg}`);
        }
    }

    const refresh = () => {
        getProfile(new FormData());
    }

    /**
     * 로그인 시, 프로필 정보를 받아오나 다른(외부) 서비스로 인해
     * LocalStorage의 정보가 깨지는 것을 고려하여 Setting 페이지 로딩 과정에서
     * 프로필 정보를 재갱신 한다.
     * @param
     * @returns
     */
    useEffect(() => {
        getProfile(new FormData());
        getApiToken();
    }, []);

    return (<section className='setting-wrap'>
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
                        <textarea className='txt' name="description" 
                            maxLength={30}
                            defaultValue={description} 
                            key={htmlUpdated}></textarea>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 접속 상태</span>
                            <label>
                                <input type="radio" value="Y" 
                                    name='sessionStatus' 
                                    defaultChecked={sessionStatus=='Y'} 
                                    key={htmlUpdated}/>
                            온라인</label>
                            <label>
                                <input type="radio" value="N" 
                                    name='sessionStatus' 
                                    defaultChecked={sessionStatus=='N'} 
                                    key={htmlUpdated}/>
                            오프라인</label>
                        </div>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>나의 달력 정보</span>
                            <label>
                                <input type="radio" value="Y" 
                                    name='sharingCalendar' 
                                    defaultChecked={sharingCalendar=='Y'} 
                                    key={htmlUpdated}/>
                            공개</label>
                            <label>
                                <input type="radio" value="N" 
                                    name='sharingCalendar' 
                                    defaultChecked={sharingCalendar=='N'} 
                                    key={htmlUpdated}/>
                            비공개</label>
                        </div>
                    </li>
                    <li>
                        <div className='switch'>
                            <span>API 토큰&nbsp;&nbsp;&nbsp;
                                <button type='button' onClick={updateApiToken}><i className='bx bx-repost'></i></button>
                            </span>
                            <input defaultValue={apiToken} />
                        </div>
                    </li>
                </ul>
            </form> </section>
        </div>
        <div className='btn-group'> 
            <button type='button' onClick={refresh}>
                <i className='bx bx-refresh'></i></button>
            <button type='button' onClick={applySettingValue}>
                <i className='bx bx-check'></i></button>
        </div>
    </section>);
}