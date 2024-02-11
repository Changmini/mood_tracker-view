export default function Calendar(activeMenu) {

    console.log(activeMenu);

    /*
        array [
            {
                date: 20240201
                , year: 2024
                , month: 2
                , day: 1
                , id: number
                , title: varchar
                , content: text
                , picture: [
                    {
                        url: "https://domain/picture/{id}"
                        , title: varchar
                        , detail: varchar(300)
                    }
                    
                ]
                , mood: number (%)
                , activity: {
                    seq: number
                    detail: 친구
                }
            }

            ...
        ]
    */

    return (
        <div id="calendar">

        {/* 
            달력의 박스를 하나의 컴포넌트로 제작하는 방식이 좋겠다. 
        */}
        </div>
    )
}