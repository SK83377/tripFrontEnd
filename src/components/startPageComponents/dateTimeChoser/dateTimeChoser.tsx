import { memo } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setDateTime } from '../../../redux/mainSlice'
import { DateTimePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const DateTimeChoser = memo<any>(function DateTimeChoser () {
    const dispatch = useDispatch()
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={useSelector((state: any) => dayjs(new Date(state.main.dateTime)))}
                    onChange={(newValue) => dispatch(setDateTime(newValue!.valueOf()))}
                    format={"DD.MM.YYYY HH:mm"}
                    ampmInClock={false}
                    ampm={false}
                />
            </LocalizationProvider>
        </>
    )
})

export default DateTimeChoser