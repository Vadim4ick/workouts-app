import { useState } from "react";
import { useMutation } from "react-query";
import cn from "classnames";

import Layout from "../../common/Layout";
import bgImage from "./../../../images/new-exercise.jpg";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import { URL } from "../../../api/url";

import styles from "./style.module.scss";
import { $api } from "../../../api/api";
import Alert from "../../ui/Alert";
import Loader from "../../ui/Loader";

const data = ["breast", "press", "muscles", "foot", "rope"];

const NewExercise = () => {
  const [name, setName] = useState("");
  const [times, setTimes] = useState(0);
  const [imageName, setImageName] = useState("breast");

  const { isSuccess, mutate, isLoading, error } = useMutation(
    "Create new exercise",
    () =>
      $api({
        url: "/exercises",
        type: "POST",
        body: { name, times, imageName },
      }),
    {
      onSuccess(data) {
        setName("");
        setTimes("");
        setImageName("breast");
      },
    }
  );

  const handelSubmit = (e) => {
    e.preventDefault();
    if (name && times && imageName) {
      mutate();
    }
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new exercise" />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {isSuccess && <Alert text="Exercise created" />}
        {isLoading && <Loader />}
        <form onSubmit={handelSubmit}>
          <Field
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Field
            placeholder="Enter times"
            value={times}
            onChange={(e) => setTimes(e.target.value)}
            required
          />

          <div className={styles.images}>
            {data.map((name) => (
              <img
                onClick={() => setImageName(name)}
                src={`${URL}/uploads/exercises/${name}.svg`}
                key={name}
                alt={name}
                className={cn({
                  [styles.active]: imageName === name,
                })}
              />
            ))}
          </div>
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewExercise;
