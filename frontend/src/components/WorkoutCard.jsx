import { useAuthContext } from "../hooks/useAuth";
import { useWorkoutsContext } from "../hooks/useWorkouts";
import formatDistanceTONow from "date-fns/formatDistanceToNow"
const WorkoutCard = ({workout}) => {

  const { user } = useAuthContext();
  const {dispatch} = useWorkoutsContext();
  const clickEvent = async (e) => {
    if(!user)
      return;
    // console.log(workout);
      const resp = await fetch("/api/workouts/" + workout._id , {
        method : 'DELETE',
        headers :{
          'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await resp.json();
      if(!resp.ok)
         return {error : "There is an error"};
      dispatch({type : "DELETE_WORKOUT" , payload : workout});
      
  }
  return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>load</strong> : {workout.load}</p>
        <p><strong>reps</strong> : {workout.reps}</p>
        <p>{ formatDistanceTONow(new Date(workout.createdAt) , {addSuffix : true}) }</p>
        <span className="material-symbols-outlined" onClick={clickEvent}>delete</span>
    </div>
  )
}

export default WorkoutCard