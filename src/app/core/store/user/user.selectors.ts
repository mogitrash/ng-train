import { TrainState } from '../store.model';

export const selectCurrentAccess = ({ user }: TrainState) => user.currentAccess;
