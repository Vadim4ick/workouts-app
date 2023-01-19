import { useNavigate } from "react-router-dom";
import Layout from "../../common/Layout";
import Button from "../../ui/Button";
import Counters from "../../ui/Counters";
import styles from "./Home.module.scss";
import bgImage from "./../../../images/home-bg.jpg";
import { useQuery } from "react-query";
import { $api } from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  const { data, isSuccess } = useQuery(
    "home page counters",
    () =>
      $api({
        url: "/users/profile",
      }),
    {
      refetchOnWindowFocus: false,
      enabled: isAuth,
    }
  );

  return (
    <Layout bgImage={bgImage}>
      <Button
        style="main"
        callback={() => navigate("/new-workout")}
        text="New"
      />
      <h1 className={styles.heading}>EXERCISES FOR THE SHOULDERS</h1>
      {isSuccess && isAuth && (
        <Counters
          minutes={data.minutes}
          workouts={data.workouts}
          kgs={data.kgs}
        />
      )}
    </Layout>
  );
};

export default Home;
