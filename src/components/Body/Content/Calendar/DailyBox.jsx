export default function dailybox({daily}) {
    console.log(daily);
    return (
        <div className="daily">
            {daily.date} <br/>
            {daily.title} <br/>
            {daily.content} <br/>
        </div>
    )
}