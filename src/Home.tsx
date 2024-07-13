import React, { useEffect, useState } from 'react'
import "./index.css"
import Charts from "./Cahrts"

interface CollegeData {
    facultyName: string;
    committeeCount: number;
}


function Home() {

    const [user, setUser] = useState([]);
    const [trans, setTrans] = useState([]);
    const [serAmount, setSerAmount] = useState(0);
    const [serName, setSerName] = useState("");
    const [show, setShow] = useState(0);
    const [chart , setChart] =useState<any>();
    const [name, setName] = useState("");
    const arr = [
        {
            facultyName: "ah",
            committeeCount: 5,
        }
    ]
    async function Fetch() {
        const res = await fetch(`http://localhost:4000/customers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res1 = await fetch(`http://localhost:4000/transactions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        const data1 = await res1.json();
        setUser(data);
        for (let i = 0; i < data1.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (data1[i].customer_id == data[j].id) {
                    data1[i].name = data[j].name;
                }
            }
        }
        setTrans(data1);
    }
    useEffect(() => {
        Fetch();
    }, []);

    useEffect(() => {
        async function Fetch() {
            const res = await fetch(`http://localhost:4000/transactions?amount=${serAmount}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < user.length; j++) {
                    if (data[i].customer_id == user[j].id) {
                        data[i].name = user[j].name;
                    }
                }
            }
            setTrans(data);
        }
        Fetch();

    }, [serAmount]);

    useEffect(() => {
        async function get() {

            const res = await fetch(`http://localhost:4000/transactions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data1 = await res.json();

            for (let i = 0; i < data1.length; i++) {
                for (let j = 0; j < user.length; j++) {
                    if (data1[i].customer_id == user[j].id) {
                        data1[i].name = user[j].name;
                    }
                }
            }
            const newRes = data1.filter((item: any) => {
                let ok = 0;
                for (let i = 0; i <= item.name.length - serName.length; i++) {
                    let s = item.name.substr(i, serName.length);
                    if (s.toLowerCase() === serName.toLowerCase()) {
                        ok = 1;
                        break;
                    }
                }
                return ok;
            })
            setTrans(newRes);

        }
        get();
    }, [serName]);


    function showData(id : any) {
        setShow(1);
        async function Fetch() {
            const res = await fetch(`http://localhost:4000/transactions?customer_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < user.length; j++) {
                    if (data[i].customer_id == user[j].id) {
                        data[i].name = user[j].name;
                    }
                }
            }

            let chartData = []
            
            for(let i=0 ;i<data.length ; i++){
                let item = {
                    day: data[i].date,
                    amount: data[i].amount
                }
                chartData.push(item);
            }
            setName(data[0].name);
            setChart(chartData);
        }
        Fetch();
    }
    return (
        <div className="container">
            <div className='inp'>
                <div>
                    <input onChange={(e: any) => setSerName(e.target.value)} placeholder='search by name' type='text'></input>
                </div>
                <div>
                    <input onChange={(e: any) => setSerAmount(e.target.value)} placeholder='search by amount' type='number'></input>
                </div>
            </div>
            <table border="1" >
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Statics</th>
                </tr>
                {
                    trans.map((item) => <tr>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}$</td>
                        <td><a href='#chart' onClick={() => showData(item.customer_id)} style={{ "cursor": "pointer", "color": "green" }}>Show Statics</a></td>
                    </tr>)

                }
            </table>
            <div id="chart" style={{ "textAlign": "center", "marginBottom": "100px" }}>
                {
                    show ? <>
                        <h1 style={{ "textAlign": "center", "marginTop": "100px" }}>Data For {name}</h1>
                        <Charts data={chart}></Charts>
                    </>
                        : ""
                }
            </div>
        </div>
    )

}
export default Home