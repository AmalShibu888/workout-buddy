import { useAuthContext } from "./useAuth"
import { useWorkoutsContext } from "./useWorkouts";


const useLogout = ()=>{
    const {dispatch : workoutDispatch} = useWorkoutsContext()
    const {dispatch} = useAuthContext();
    const logout = ()=>{
        localStorage.removeItem('user');

        dispatch({type : 'LOGOUT'});
        workoutDispatch({type :'SET_WORKOUT' , payload : null });
    }

    return logout;
}

export default useLogout;
