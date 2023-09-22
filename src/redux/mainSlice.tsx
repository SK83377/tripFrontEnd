import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MainState {
    wss: any,
    stations: {
        startSt: {
            id: number|null,
            statn: string
        },
        endSt: {
            id: number|null,
            statn: string
        }
    },
    dateTime: number
  }
  const initialState: MainState = {
    wss: null,
    stations: {
        startSt: {
            id: null,
            statn: ''
        },
        endSt: {
            id: null,
            statn: ''
        }
    },
    dateTime: Date.now()
  }
  
  export const mainSlice = createSlice({
    name: 'mainReducer',
    initialState,
    reducers: {
        openWss: (state: any, action: PayloadAction<any>) => {
            state.wss = action.payload;
        },
        closeWss: (state: any) => {
            state.wss = null;
        },
        saveStations: (state: any, action: PayloadAction<any>) => {
            state.stations[action.payload.stType].statn = action.payload.station;
            if (action.payload.id) {
                state.stations[action.payload.stType].id = action.payload.id;
            }
        },
        setDateTime: (state: any, action: PayloadAction<number>) => {
            state.dateTime = action.payload;
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { openWss, closeWss, saveStations, setDateTime } = mainSlice.actions
  
  export default mainSlice.reducer