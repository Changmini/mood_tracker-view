import { useState, useEffect } from 'react'
import $common from '../../common';
export default function Neighbor() {

    useEffect(() => {
        const f = new FormData();
    }, []);

    return (<div className='neighbor-wrap'>
        <div className='neighbor-left'>
            <div className='search-nickname'>
                <input type="text" 
                    name='nickname' 
                    className='search-nick-ipt' 
                    placeholder='대상을 별칭으로 검색'/>
                <button type='button' 
                    className='search-nick-btn'>검색</button>
            </div>
            <div className='neighbor-list'>
                <div>
                    <input type="text" 
                        className='search-list-follower' 
                        placeholder='목록 검색'/>
                </div>
                
                <div>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>

        </div>
        <div className="neighbor-right">
            채팅해요~~
        </div>
    </div>)
}