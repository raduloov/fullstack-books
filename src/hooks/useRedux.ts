import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../store';

/**
 * Pre-typed versions of 'useDispatch' and 'useSelector',
 * should be used throughout the app -> saves the need to
 * write (state: RootState) every time
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
