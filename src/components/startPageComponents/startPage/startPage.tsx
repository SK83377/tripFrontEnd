import '../startPageComponentsCss/startPageComponents.css'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { openWss, saveStatnsList } from '../../../redux/mainSlice'
import StationsChoser from '../stationsChoser/stationsChoser'
import DateTimeChoser from '../dateTimeChoser/dateTimeChoser'


const StartPage = () => {
    console.log('in StartPage')
    const dispatch = useDispatch()
    useEffect(()=>{
        console.log('in StartPage in useEffect')
        const ws = new WebSocket('ws://192.168.32.4:4117')
        dispatch(openWss(ws))

        ws.onopen = () => console.log("ws opened")
        ws.onclose = () => {
            console.log("ws closed")
        };
        ws.onmessage = (message: any) => {
            console.log('message.data: ', message.data)
            if (message.data != "connection established") {
                const msgData: any = JSON.parse(message.data)
                console.log('msgData: ', msgData)
                dispatch(saveStatnsList(msgData))
            }
        };
    }, [dispatch])

    const stTypes = {
        startSt: "startSt",
        endSt: "endSt"
    }
    return (
        <div>
            <StationsChoser stType={stTypes.startSt} />
            <StationsChoser stType={stTypes.endSt} />
            <div id="date-time-block">
            <DateTimeChoser />
            </div>
            <button>Search</button>
        </div>
    )
}

export default StartPage