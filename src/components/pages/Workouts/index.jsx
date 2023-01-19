import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import Header from "../../common/Header";
import styles from "./style.module.scss";
import stylesLayout from "./../../common/Layout.module.scss";
import bgImage from "./../../../images/workout-bg.jpg";
import { $api } from "../../../api/api";
import { URL } from "../../../api/url";
import Alert from "../../ui/Alert";
import Loader from "../../ui/Loader";

const SingleWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = useQuery("get workout", () =>
    $api({
      url: `/workouts/log/${id}`,
    })
  );

  const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
    "Change log state",
    () =>
      $api({
        url: "/workouts/log/completed",
        type: "PUT",
        body: { logId: id },
      }),
    {
      onSuccess() {
        navigate(`/workouts`);
      },
    }
  );

  useEffect(() => {
    if (
      isSuccess &&
      data?.exerciseLogs &&
      data.exerciseLogs.length ===
        data.exerciseLogs.filter((log) => log.completed).length &&
      data._id === id
    ) {
      setWorkoutCompleted();
    }
  }, [data?.exerciseLogs]);

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{ backgroundImage: `url(${bgImage})`, height: 356 }}
      >
        <Header />
        <div className={styles.center}>
          {isSuccess && (
            <div>
              <time className={styles.time}>{data.minutes} min</time>
              <h1 className={stylesLayout.heading}>{data.name}</h1>
            </div>
          )}
        </div>
      </div>
      <div
        className="wrapper-inner-page"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div style={{ width: "90%", margin: "0 auto" }}>
          {errorCompleted && <Alert type="error" text={errorCompleted} />}
        </div>

        {isLoading || (isSuccess && data._id !== id) ? (
          <Loader />
        ) : (
          <div className={styles.wrapper}>
            {data.exerciseLogs.map((ex, idx) => {
              return (
                <div key={idx}>
                  <div className="item">
                    <button
                      aria-label="Move to exercise"
                      onClick={() => navigate(`../exercise/${ex._id}`)}
                    >
                      <span>{ex.exercise.name}</span>
                      <img
                        src={`${URL}/uploads/exercises/${ex.exercise.imageName}.svg`}
                        alt=""
                        height="34"
                      />
                    </button>
                  </div>

                  {idx % 2 !== 0 && <span className={styles.line}></span>}
                </div>
              );
            })}
          </div>
        )}

        {isSuccess && data?.length === 0 && (
          <Alert type="warning" text="Exercises not found" />
        )}
      </div>
    </>
  );
};

export default SingleWorkout;
