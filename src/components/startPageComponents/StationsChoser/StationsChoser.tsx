import { memo } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { saveStations } from '../../../redux/mainSlice'

const StationsChoser = memo<any>(function StationsChoser (stType: any) {
    const dispatch = useDispatch()
    const statnsList = useSelector((state: any) => state.main.statnsList[stType.stType])
    const renderStList = () => (
        statnsList.map((item: any)=>(
            <div className='station-item-block' onClick={()=>dispatch(saveStations({stType: stType.stType, id: item.id, station: item.name}))}>
                <div className='station-item'>{item.name}</div>
                <div className='city-item'>{item.city}</div>
            </div>
        ))
    )
    return (
        <>
            <div>
                <p className="station-text">
                    Enter start station
                </p>
                <input type="text" value={useSelector((state: any) => state.main.stations[stType.stType].statn)} onChange={(e)=>dispatch(saveStations({station: e.target.value, stType: stType.stType}))} className="station-input" />
            </div>
            <div className='stations-list'>
                {statnsList.length > 0 ? renderStList() : <></>}
            </div>
        </>
    )
})

export default StationsChoser