import Layout from "../../common/Layout";
import bgImage from "./../../../images/create-workout.jpg";

const Err404 = () => {
  return (
    <>
      <Layout bgImage={bgImage} heading="Page not Found" />
      <div className="wrapper-inner-page">404 page not found</div>
    </>
  );
};

export default Err404;
