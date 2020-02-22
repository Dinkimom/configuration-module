import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../store/state';
import { ConfigurationBlock } from '../configurationElements/ConfigurationBlock';

interface IAppProps {
    children: ReactNode;
}

export const App = ({ children }: IAppProps) => {
    const isInitialized = Boolean(useSelector((state: IRootState) => state.panel));
    return (
        isInitialized &&
        <>
            <ConfigurationBlock />
            <div className='app'>{children}</div>
        </>
    )
}