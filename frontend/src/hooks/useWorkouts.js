import { WorkoutContext } from "../contexts/WorkoutContextProvider"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext)

//   console.log(context);
  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}