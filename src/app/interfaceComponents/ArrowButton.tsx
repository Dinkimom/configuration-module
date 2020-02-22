import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { panelActions } from '../panel/actions';

interface IArrowButtonProps {
    name: string;
    page: string;
}

export const ArrowButton = ({ name, page }: IArrowButtonProps) => {
    const dispatch = useDispatch();
    const initComponent = () => {
        dispatch(panelActions.initComponent({ page, name, type: 'arrowButton' }))
    }

    useEffect(() => {
        initComponent()
    }, [])
    return <button>123</button>
}