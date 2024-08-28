import { useAppSelector } from '../store/rtkHooks';
import { useAppDispatch } from "../store/rtkHooks"

const useAuthInfo = () =>
{
   const dispatch = useAppDispatch();
   const { token, user, loading, error } = useAppSelector(state => state.auth);

   return { dispatch, token, user, loading, error };
}

export default useAuthInfo;