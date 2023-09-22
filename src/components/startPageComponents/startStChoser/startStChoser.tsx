import './startStChoser.css'
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

const startStChoser = () => {
    const [stStatnsList, setStStatnsList] = useState<any>([])
    const dispatch = useDispatch()
    return (
        <>
            <div>
                <p className="station-text">
                    Enter start station
                </p>
                <input type="text" value={useSelector((state: any) => state.main.stations.startSt.statn)}  onChange={(e)=>changeSt({station: e.target.value, stType: "startSt"})} className="station-input" />
            </div>
            <div className='start-stations-list'>
                {stStatnsList.length > 0 ? renderStList(stStatnsList) : <></>}
            </div>
        </>
    )
}

export default startStChoser