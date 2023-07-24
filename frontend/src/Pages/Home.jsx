import { useEffect } from "react"
import WorkoutCard from "../components/WorkoutCard";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from "../hooks/useWorkouts";
import { useAuthContext } from "../hooks/useAuth";

// state

const Home = () => {
    const {workouts , dispatch} = useWorkoutsContext();
    const { user } = useAuthContext();
    console.log(useAuthContext());
    useEffect(()=>{
        
        const getWorkouts = async () =>{
            const resp = await fetch('/api/workouts' ,{
                headers :{
                    'Authorization' : `Bearer ${user.token}`
                }
            });
            const json = await resp.json();
            if(resp.ok)
                dispatch({type : "SET_WORKOUT" , payload : json});
            
        }
            // console.log(user.token);
            if(user){
                getWorkouts();

            }

    } , [user])
  return (
    <div className="home">

        <div className="workouts">
            {workouts && workouts.map((workout)=>(
                <WorkoutCard key={workout._id} workout={workout}/>
            ))}
            
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home