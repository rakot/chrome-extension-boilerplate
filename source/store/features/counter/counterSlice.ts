import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Interface {
    counter: number;
}

const initialState:Interface = {
    counter: 0
};

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
} = counterSlice.actions;

export default counterSlice.reducer;
