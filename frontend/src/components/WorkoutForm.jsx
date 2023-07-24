import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkouts";
import { useAuthContext } from "../hooks/useAuth";



const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext();

    const [title , setTitle] = useState('');
    const [load , setLoad] = useState('');
    const [reps , setReps] = useState('');
    const [error , setError] = useState(null);
    const [emptyinp , setEmptyinp] = useState([]);
    const {user} = useAuthContext();
    const subEve = async (e)=>{
        e.preventDefault();
        if(!user){
            setError('The user is not logged in');
            return;
        }
        const res = await fetch('api/workouts' ,{
            method : 'POST',
            body : JSON.stringify({title , load ,reps}),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${user.token}`
            }
        })
        const json = await res.json();
        if(!res.ok){
            setError(json.error);
            setEmptyinp(json.emptyinp);
        }
        else{
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log("new workout added");
            console.log(json);
            dispatch({type : 'CREATE_WORKOUT' , payload : json});
        }

    }
  return (
    <form className="create" onSubmit={subEve}>
        <h3>Add a new workout</h3>

        <label>Exercise TItle : </label>
        <input 
        type="text" 
        onChange={(e)=>{setTitle(e.target.value)}}
        value = {title}
        className= {emptyinp.includes("title")? 'error' :""}
        />
        <label>Exercise load : </label>
        <input 
        type="number" 
        onChange={(e)=>{setLoad(e.target.value)}}
        value = {load}
        className= {emptyinp.includes("load")? 'error' :""}
        />
        <label>Exercise reps : </label>
        <input 
        type="number" 
        onChange={(e)=>{setReps(e.target.value)}}
        value = {reps}
        className= {emptyinp.includes("reps")? 'error' :""}
        />
        <button type="submit">Add workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
