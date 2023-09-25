import '../startPageComponentsCss/startPageComponents.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { openWss, saveStatnsList, setDateTime } from '../../../redux/mainSlice';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StationsChoser from '../StationsChoser/StationsChoser';
import dayjs from 'dayjs';
import { memo } from "react"


const StartPage = () => {
    console.log('in StartPage')
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log('in StartPage in useEffect')
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
                console.log('msgData: ', msgData)
                dispatch(saveStatnsList(msgData))
            }
        };
    }, [dispatch]);

    const stTypes = {
        startSt: "startSt",
        endSt: "endSt"
    }
    return (
        <div>
            <StationsChoser stType={stTypes.startSt} />
            <StationsChoser stType={stTypes.endSt} />
            <div id="date-time-block">
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={useSelector((state: any) => dayjs(new Date(state.main.dateTime)))}
                    onChange={(newValue) => dispatch(setDateTime(newValue!.valueOf()))}
                    format={"DD.MM.YYYY HH:mm"}
                    ampmInClock={false}
                    ampm={false}
                />
            </LocalizationProvider> */}
            </div>
            <button>Search</button>
        </div>
    )
}

export default StartPage;