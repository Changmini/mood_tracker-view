import { useState, useEffect } from 'react'
import $common from '../../common';
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,BarElement,LineElement} from 'chart.js';
import { Bar,Line, } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,BarElement,LineElement);
export default function Analysis() {
    const [startDate, setStartDate] = useState("2024-09-01");
    const [endDate, setEndDate] = useState("2024-09-30");
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '월별 나의 기분',
            },
        },
    };

    useEffect(() => {
        async function setGraph() {
            const f = new FormData();
            f.append("startDate",startDate);
            f.append("endDate",endDate);
            const res = await $common.getGraphData(f); console.log(res);
            if (!res) return ;
            res.datasets.forEach(e => {
                const [rgb, rgba] = $common.getRandomColor();// 색 중복이 있을 수 있다. 수정해야 한다.
                e.borderColor = rgb;
                e.backgroundColor = rgba;
            });
            setData(res);
        }
        setGraph();
    }, []);

    return (
        <div className="analysis">
            {/* 라인 및 막대 차트 */}
            <div className="a-chart">
                <Line options={options} data={data} />
            </div>
            {/* 원형 차트 */}
            <div className="a-chart">

            </div>
            {/* 테이블 */}
            <div className="a-table"
            ></div>
        </div>
    )
}