import Home from "./components/pages/Home";
import NewWorkout from "./components/pages/NewWorkout";
import NewExercise from "./components/pages/NewExercise";
import Auth from "./components/pages/Auth";
import Profile from "./components/pages/Profile";
import SingleWorkout from "./components/pages/Workouts";
import SingleExercise from "./components/pages/SingleExercise";
import ListWorkouts from "./components/pages/Workouts/ListWorkouts";

export const routes = [
  {
    path: "/",
    component: Home,
    auth: false,
  },
  {
    path: "/new-workout",
    component: NewWorkout,
    auth: true,
  },
  {
    path: "/auth",
    component: Auth,
    auth: false,
  },
  {
    path: "/new-exercise",
    component: NewExercise,
    auth: true,
  },
  {
    path: "/profile",
    component: Profile,
    auth: true,
  },
  {
    path: "/workouts/:id",
    component: SingleWorkout,
    auth: true,
  },
  {
    path: "/workouts",
    component: ListWorkouts,
    auth: true,
  },
  {
    path: "/exercise/:id",
    component: SingleExercise,
    auth: true,
  },
];
