import './startPage.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { openWss, saveStations, setDateTime } from '../../../redux/mainSlice';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import startStChoser from '../startStChoser/startStChoser';
import dayjs from 'dayjs';


const StartPage = () => {
    const [stStatnsList, setStStatnsList] = useState<any>([]);
    const [endStatnsList, setEndStatnsList] = useState<any>([]);
    const dispatch = useDispatch()
    useEffect(()=>{
        const ws = new WebSocket('ws://192.168.32.4:4117');
        dispatch(openWss(ws));

        ws.onopen = () => console.log("ws opened");
        ws.onclose = () => {
            console.log("ws closed");
        };
        ws.onmessage = (message: any) => {
            console.log('message.data: ', message.data);
            if (message.data != "connection established") {
                const msgData: any = JSON.parse(message.data);
                console.log('msgData: ', msgData);
                if (msgData.stType == 'startSt') setStStatnsList(msgData.stations);
                if (msgData.stType == 'endSt') setEndStatnsList(msgData.stations);
            }
        };
    },[dispatch]);
    const ws: any = useSelector((state: any) => state.main.wss);
    const changeSt = (statnData: any) => {
        console.log(statnData);
        dispatch(saveStations(statnData));
        statnData.station && ws.send(JSON.stringify(statnData));
    };
    const setDT = (newValue: number) => {
        console.log(newValue.valueOf());
        dispatch(setDateTime(newValue));
    };
    const clickSt = (clickStData: any) => {
        dispatch(saveStations(clickStData));
        clickStData.stType == 'startSt' ? setStStatnsList([]) : setEndStatnsList([])
    }
    const renderStList = (statnsList: any) => (
        stStatnsList.map((item: any)=>(
            <div className='station-item-block' onClick={()=>clickSt({stType: 'startSt',id: item.id, station: item.name})}>
                <div className='station-item'>{item.name}</div>
                <div className='city-item'>{item.city}</div>
            </div>
        ))
    );
    console.log(useSelector((state: any) => state.main.dateTime))
    return (
        <div>
            startStChoser
            <div className='end-stations-list'>
                {stStatnsList.length > 0 ? renderStList(stStatnsList) : <></>}
            </div>
            <div id="date-time-block">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={useSelector((state: any) => dayjs(new Date(state.main.dateTime)))}
                    onChange={(newValue) => {setDT(newValue!.valueOf())}}
                    format={"DD.MM.YYYY HH:mm"}
                    ampmInClock={false}
                    ampm={false}
                />
            </LocalizationProvider>
            </div>
            <button>Search</button>
        </div>
    )
}

export default StartPage;