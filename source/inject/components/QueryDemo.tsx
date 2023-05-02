import React from 'react';
import { useGetPlaceholderPost } from '../services/JsonPlaceholder.service';

const QueryDemo = () => {
    const { isLoading, data } = useGetPlaceholderPost(1);
    return (
        <div>
            {isLoading
                ? 'Loading'
                : <div>
                    <div className={'my-2 max-w-sm'}>UserId: {data?.data.userId}</div>
                    <div className={'my-2 max-w-sm'}>id: {data?.data.id}</div>
                    <div className={'my-2 max-w-sm'}>title: {data?.data.title}</div>
                    <div className={'my-2 max-w-sm'}>body: {data?.data.body}</div>
                </div> }
        </div>
    );
};

export default QueryDemo;
