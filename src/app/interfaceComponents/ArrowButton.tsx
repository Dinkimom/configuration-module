import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { panelActions } from '../panel/actions';

interface IArrowButtonProps {
    name: string
}

export const ArrowButton = ({ name }: IArrowButtonProps) => {
    const dispatch = useDispatch();
    const initComponent = () => {
        dispatch(panelActions.initComponent({ name, type: 'arrowButton' }))
    }

    useEffect(() => {
        initComponent()
    }, [])
    return <button>123</button>
}