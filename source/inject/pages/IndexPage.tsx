import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectCounter } from '../../store/features/counter/counterSelector';
import { addValueToCounterAction } from '../../store/features/counter/counterSlice';
import { useDispatch } from 'react-redux';

const IndexPage = () => {
    const counter = useAppSelector(selectCounter);
    const dispatch = useDispatch();

    return (
        <div>
            <div><b>Counter:</b> <span>{counter}</span></div>
            <button className={'mt-4 py-1.5 rounded-lg bg-green-500 text-white w-full'} onClick={() => {
                dispatch(addValueToCounterAction(1));
            }}>Add 1</button>
        </div>
    );
};

export default IndexPage;
