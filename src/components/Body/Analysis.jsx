import { useState, useEffect } from 'react'
import $common from '../../common';
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,BarElement,LineElement} from 'chart.js';
import { Bar,Line, } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,PointElement,Title,Tooltip,Legend
    ,BarElement,LineElement);
export default function Analysis() {
    const [data, setData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: '분류 1', //그래프 분류되는 항목
                data: [1, 2, 3, 4, 5, 6, 7], //실제 그려지는 데이터(Y축 숫자)
                borderColor: 'rgb(255, 99, 132)', //그래프 선 color
                backgroundColor: 'rgba(255, 99, 132, 0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
            },
            {
                label: '분류 2',
                data: [2, 3, 4, 5, 4, 7, 8],
                borderColor: 'rgb(53, 162, 235)', //실제 그려지는 데이터(Y축 숫자)
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    });
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    useEffect(() => {
        async function setGraph() {
            const f = new FormData();
            // f.append("",);
            const res = await $common.getGraphData(f);
            if (!res) return ;
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