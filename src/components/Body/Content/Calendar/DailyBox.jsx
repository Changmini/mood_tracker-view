export default function dailybox({daily, sendDataToParent}) {
    const clickbox = () => {
        sendDataToParent(daily);
    }
    return (
        <div className="daily" onClick={clickbox}>
            {daily.date} <br/>
            {daily.title} <br/>
            {daily.notes} <br/>
        </div>
    )
}