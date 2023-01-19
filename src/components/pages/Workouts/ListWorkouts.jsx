import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import styles from "./style.module.scss";
import bgImage from "./../../../images/workout-bg.jpg";
import { $api } from "../../../api/api";
import Alert from "../../ui/Alert";
import Layout from "../../common/Layout";
import Loader from "../../ui/Loader";

const ListWorkouts = () => {
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery(
    "get workouts",
    () =>
      $api({
        url: `/workouts`,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    mutate: createWorkoutLog,
    isLoading,
    isSuccess: isSuccessMutate,
    error,
  } = useMutation(
    "Create new workout log",
    ({ workoutId }) =>
      $api({
        url: "/workouts/log",
        type: "POST",
        body: { workoutId },
      }),
    {
      onSuccess(data) {
        navigate(`/workouts/${data._id}`);
      },
    }
  );

  return (
    <>
      <Layout bgImage={bgImage} heading="Workout list" />
      <div
        className="wrapper-inner-page"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {error && <Alert type="error" text={error} />}
        {isSuccessMutate && <Alert text="Workout log created" />}
        {isLoading && <Loader />}
        {isSuccess ? (
          <div className={styles.wrapper}>
            {data.map((workout, idx) => {
              return (
                <div key={idx}>
                  <div className="item">
                    <button
                      aria-label="Create new workout"
                      onClick={() => {
                        return createWorkoutLog({
                          workoutId: workout._id,
                        });
                      }}
                    >
                      <span>{workout.name}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Alert type="warning" text="Workouts not found" />
        )}
      </div>
    </>
  );
};

export default ListWorkouts;
