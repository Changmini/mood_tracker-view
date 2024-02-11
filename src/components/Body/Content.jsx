export default function Context({sideMenu, menuNumber}) {

    /*
        렌더링 전 데이터 세팅이 먼
    */
    
    return (
        <div className='content-main'>
            {
                sideMenu[menuNumber].component(menuNumber)
            }
        </div>
    );
};


