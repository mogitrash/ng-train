import { TrainState } from '../store.model';

export const selectCurrentAccess = ({ user }: TrainState) => {return user.currentAccess};
