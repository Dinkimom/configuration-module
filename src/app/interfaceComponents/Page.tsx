import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store/state';
import { panelActions } from '../panel/actions';

interface IPageProps {
    name: string;
    children: ReactNode;
}

export const Page = ({ name, children }: IPageProps) => {
    const dispatch = useDispatch();
    const isInitialized = Boolean(useSelector((state: IRootState) => state.panel[name]));

    const initPage = () => {
        dispatch(panelActions.initPage({ name }));
    }
    useEffect(() => {
        if (!isInitialized) {
            initPage()
        }
    }, [])

    const childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child as any, { page: name })
    );

    return isInitialized && <div className='app__page'>{childrenWithProps}</div>
}