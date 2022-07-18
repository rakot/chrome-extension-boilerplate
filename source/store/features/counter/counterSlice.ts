import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:Interface = {
    counter: 0
}

interface Interface {
    counter: number;
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addValueToCounterAction: (state, action:PayloadAction<number>) => {
            state.counter += action.payload;
        }
    }
});

export const {
    addValueToCounterAction
} = counterSlice.actions

export default counterSlice.reducer;