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
    const [LineOrBar, setLineOrBar] = useState({labels: [],datasets: []});
    const [Arc, setArc] = useState({labels: [],datasets: []});
    const options_line_bar = {
        responsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {
                display: true,
                text: '월별 요일 기분',
            },
        },
    };
    const options_arc = {
        responsive: true,
        plugins: {
            legend: {position: 'top'},
            title: {
                display: true,
                text: '월별 기분',
            },
        },
    };

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
        
        const monthlyLabels = [];
        const monthlyTotal = [];
        line_bar.datasets.forEach(e => {
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
        setLineOrBar(line_bar);

        const arc = {labels: monthlyLabels, datasets: []};
        const arcDataset = {};
        monthlyTotal.forEach(n => {
            if (!arcDataset.data) arcDataset.data = [];
            if (!arcDataset.backgroundColor) arcDataset.backgroundColor = [];
            if (!arcDataset.borderColor) arcDataset.borderColor = [];
            arcDataset.data.push(n);
            const [rgb, rgba] = $common.getRandomColor();// 색 중복이 있을 수 있다. 수정해야 한다.
            arcDataset.backgroundColor.push(rgba);
            arcDataset.borderColor.push(rgb);
        });
        arc.datasets.push(arcDataset);
        setArc(arc);
        console.log(arc);
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
            <div className="a-chart">
                <Line options={options_line_bar} data={LineOrBar} /> 
                {/* or barchart */}
            </div>
            {/* 원형 차트 */}
            <div className="a-chart">
                <Pie options={options_arc} data={Arc} />
            </div>
            {/* 테이블 */}
            <div className="a-table"
            ></div>
        </div>
    </>)
}