/* eslint-disable react-hooks/rules-of-hooks */

import { useAppSelector } from '@/hooks/typedReduxHooks';

export const notificationsSelector = () => useAppSelector((state) => state.notifications);
