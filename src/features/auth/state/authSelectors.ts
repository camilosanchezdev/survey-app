/* eslint-disable react-hooks/rules-of-hooks */

import { useAppSelector } from '@/hooks/typedReduxHooks';

export const isAuthenticated = () => useAppSelector((state) => state.auth.isAuthenticated);
