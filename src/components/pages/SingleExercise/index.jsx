import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import debounce from "lodash.debounce";
import Header from "../../common/Header";
import styles from "./style.module.scss";
import stylesLayout from "./../../common/Layout.module.scss";
import bgImage from "./../../../images/exercises1.jpg";
import bgImage2 from "./../../../images/exercises2.jpg";
import checkImage from "./../../../images/check.svg";
import checkCompletedImage from "./../../../images/completed.svg";
import { $api } from "../../../api/api";
import Alert from "../../ui/Alert";
import { URL } from "../../../api/url";
import cn from "classnames";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const SingleExercise = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [bgImages, setBgImages] = useState(bgImage);

  const { data, isSuccess, refetch } = useQuery(
    "get exercise log",
    () =>
      $api({
        url: `/exercises/log/${id}`,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutate: changeState, error: errorChange } = useMutation(
    "Change log state",
    ({ timeIndex, key, value }) =>
      $api({
        url: "/exercises/log",
        type: "PUT",
        body: { timeIndex, key, value, logId: id },
        auth: false,
      }),
    {
      onSuccess(data) {
        refetch();
      },
    }
  );

  const { mutate: setExCompleted, error: errorCompleted } = useMutation(
    "Change log state",
    () =>
      $api({
        url: "/exercises/log/completed",
        type: "PUT",
        body: { completed: true, logId: id },
        auth: false,
      }),
    {
      onSuccess(data) {
        navigate(-1);
      },
    }
  );

  useEffect(() => {
    setBgImages(getRandomInt(2) === 0 ? bgImage : bgImage2);
  }, []);

  useEffect(() => {
    if (
      isSuccess &&
      data.times.filter((time) => time.completed).length === data.times.length
    ) {
      setExCompleted();
    }
  }, [data?.times, isSuccess]);

  return (
    <>
      <div
        className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
        style={{
          backgroundImage: `url(${bgImages})`,
          height: 356,
        }}
      >
        <Header />
        <div className={styles.center}>
          {isSuccess && (
            <div className={styles.heading}>
              <img
                src={`${URL}/uploads/exercises/${data.exercise.imageName}.svg`}
                alt=""
                height="50"
                draggable={false}
              />
              <h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
            </div>
          )}
        </div>
      </div>
      <div
        className="wrapper-inner-page"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div style={{ width: "90%", margin: "0 auto" }}>
          {errorChange && <Alert type="error" text={errorChange} />}
          {errorCompleted && <Alert type="error" text={errorCompleted} />}
        </div>
        {isSuccess ? (
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div>
                <span>Previous</span>
              </div>
              <div>
                <span>Repeat & weight</span>
              </div>
              <div>
                <span>Completed</span>
              </div>
            </div>

            {data.times.map((item, idx) => (
              <div
                className={cn(styles.row, {
                  [styles.completed]: item.completed,
                })}
                key={idx}
              >
                {console.log(item)}
                <div className={styles.opacity}>
                  <input type="tel" value={item.prevWeight} disabled />
                  <i>kg{item.completed ? "" : " "}/</i>
                  <input type="tel" value={item.prevRepeat} disabled />
                </div>
                <div>
                  <input
                    type="tel"
                    defaultValue={item.weight}
                    onChange={debounce(
                      (e) =>
                        e.target.value &&
                        changeState({
                          timeIndex: idx,
                          key: "weight",
                          value: e.target.value,
                        }),
                      800
                    )}
                  />
                  <i>kg{item.completed ? "" : " "}/</i>
                  <input
                    type="tel"
                    defaultValue={item.repeat}
                    onChange={debounce(
                      (e) =>
                        e.target.value &&
                        changeState({
                          timeIndex: idx,
                          key: "repeat",
                          value: e.target.value,
                        }),
                      800
                    )}
                  />
                </div>
                <div>
                  <img
                    src={item.completed ? checkCompletedImage : checkImage}
                    className={styles.checkbox}
                    alt=""
                    onClick={() =>
                      changeState({
                        timeIndex: idx,
                        key: "completed",
                        value: !item.completed,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert type="warning" text="times not found" />
        )}
      </div>
    </>
  );
};

export default SingleExercise;
