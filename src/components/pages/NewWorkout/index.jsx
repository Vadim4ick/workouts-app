import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";

import Layout from "../../common/Layout";
import bgImage from "./../../../images/create-workout.jpg";
import Field from "../../ui/Field";
import Button from "../../ui/Button";
import { optionColor } from "./optionColor";
import { $api } from "../../../api/api";
import Alert from "../../ui/Alert";
import Loader from "../../ui/Loader";

const NewWorkout = () => {
  const [name, setName] = useState("");
  const [exercisesCurrent, setExercisesCurrent] = useState([]);

  const { data, isSuccess } = useQuery(
    "list exercises",
    () =>
      $api({
        url: "/exercises",
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const {
    mutate,
    isLoading,
    isSuccess: isSuccessMutate,
    error,
  } = useMutation(
    "Create new workout",
    ({ exerciseIds }) =>
      $api({
        url: "/workouts",
        type: "POST",
        body: { name, exerciseIds },
      }),
    {
      onSuccess() {
        setName("");
        setExercisesCurrent([]);
      },
    }
  );

  const handelSubmit = (e) => {
    e.preventDefault();

    const exerciseIds = exercisesCurrent.map((ex) => ex.value);

    mutate({ exerciseIds });
  };

  return (
    <>
      <Layout bgImage={bgImage} heading="Create new workout" />
      <div className="wrapper-inner-page">
        {error && <Alert type="error" text={error} />}
        {isSuccessMutate && <Alert text="Workout created" />}
        {isLoading && <Loader />}
        <form onSubmit={handelSubmit}>
          <Field
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Link to="/new-exercise" className="darkLink">
            Add new exercise
          </Link>
          {isSuccess && data && (
            <ReactSelect
              className="select2-selection"
              classNamePrefix="select2-selection"
              placeholder="Exercises..."
              title="Exercises..."
              options={data.map((ex) => ({
                value: ex._id,
                label: ex.name,
              }))}
              value={exercisesCurrent}
              onChange={setExercisesCurrent}
              theme={(theme) => optionColor(theme)}
              isMulti
            />
          )}
          <Button text="Create" callback={() => {}} />
        </form>
      </div>
    </>
  );
};

export default NewWorkout;
