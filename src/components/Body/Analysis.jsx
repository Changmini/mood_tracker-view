import { useState, useEffect } from 'react'
import $common from '../../common';
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,ArcElement,BarElement,LineElement} from 'chart.js';
import { Bar,Line,Pie } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,ArcElement,BarElement,LineElement);
export default function Analysis() {
    const today = (new Date()).toISOString().substring(0,10);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [LineData, setLineData] = useState({labels: [],datasets: []});
    const [PieData, setPieData] = useState({labels: [],datasets: []});
    const [BarData, setBarData] = useState({labels: [],datasets: []});
    /*  차트 기본 옵션 */
    const options_line = $common.chartDefaultOption;
    options_line.plugins.title.text = "월별 요일 기분";
    const options_arc = $common.chartDefaultOption;
    options_line.plugins.title.text = "월별 기분";
    const options_bar = $common.chartDefaultOption;
    options_bar.plugins.title.text = "월별 당일 기분";

    const selectDate = (e, type) => {
        const chnageDate = e.target.value;
        switch(type) {
            case "start":
                setStartDate(chnageDate);
                break;
            case "end":
                setEndDate(chnageDate);
                break;
            default: break;
        }
    }

    async function setGraph(formData) {
        if (!formData) {
            console.error(`파라미터에 FormData(=object)가 없습니다.`);
            return ;
        }
        formData.append("startDate",startDate);
        formData.append("endDate",endDate);
        const line_bar = await $common.getGraphData(formData);
        if (!line_bar) return ;
        
        const lineChart = line_bar.lineChart;
        const monthlyLabels = [];
        const monthlyTotal = [];
        lineChart.datasets.forEach(e => {
            const [rgb, rgba] = $common.getRandomColor();// 색 중복이 있을 수 있다. 수정해야 한다.
            e.borderColor = rgb;
            e.backgroundColor = rgba;
            let total = 0;
            for (let d of e.data) {
                total += d;
            }
            monthlyTotal.push(total);
            monthlyLabels.push(e.label);
        });
        setLineData(lineChart);

        const pie = {labels: monthlyLabels, datasets: []};
        const pieDataset = {};
        monthlyTotal.forEach(n => {
            if (!pieDataset.data) pieDataset.data = [];
            if (!pieDataset.backgroundColor) pieDataset.backgroundColor = [];
            if (!pieDataset.borderColor) pieDataset.borderColor = [];
            pieDataset.data.push(n);
            const [rgb, rgba] = $common.getRandomColor();// 색 중복이 있을 수 있다. 수정해야 한다.
            pieDataset.backgroundColor.push(rgba);
            pieDataset.borderColor.push(rgb);
        });
        pie.datasets.push(pieDataset);
        setPieData(pie);

        const barChart = line_bar.barChart;
        barChart.datasets.forEach(e => {
            const [rgb, rgba] = $common.getRandomColor();// 색 중복이 있을 수 있다. 수정해야 한다.
            e.borderColor = rgb;
            e.backgroundColor = rgba;
        });
        setBarData(barChart);
        console.log(barChart);
    }

    const search = async function(e) {
        const f = new FormData();
        setGraph(f);
    }

    useEffect(() => {
        const f = new FormData();
        setGraph(f);
    }, []);

    return (<>
        <div className='search-analysis'>
            <input id='date-input' type="date" defaultValue={startDate} onChange={(e)=>selectDate(e,'start')}/>
            <span className='fs-15 m-l-10 m-r-10'>~</span>
            <input type="date" defaultValue={endDate} onChange={(e)=>selectDate(e,'end')}/>
            <button className='m-l-20' onClick={search}>검색</button>
        </div>
        <div className="analysis">
            {/* 라인 및 막대 차트 */}
            <div className="line-chart">
                <Line options={options_line} data={LineData} /> 
                {/* or barchart */}
            </div>
            {/* 원형 차트 */}
            <div className="arc-chart">
                <Pie options={options_arc} data={PieData} />
            </div>
            {/* 테이블 */}
            <div className="bar-table">
                <Bar options={options_bar} data={BarData} />
            </div>
        </div>
    </>)
}