import { useEffect, useState } from 'react';
import $common from '../../common';
export default function () {
    const [nickname] = useState("뽀또");

    return (<div className='setting-wrap'>
        <div className='setting setting-div100'>
            <section className='setting-profile'>
                <div><img /></div>
                <div><h5>{nickname}</h5></div>
                <div>
                    <label for="description">소개글</label>
                    <textarea name="description" maxLength={255}></textarea>
                </div>
            </section>
            <section className='setting-config'>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </section>
        </div>
    </div>);
}