import Card from "../components/Card";

const Home = () => {
  return (
    <div className="my-5">
      <h1 className="my-3 text-center">School Management Software</h1>
      <h4 className="my-4 text-center">Welcome!!</h4>
      <div className="container">
        <div className="row  p-5 my-5 justify-content-center g-3">
          <div className="col-lg-4 col-md-6">
            <Card icon="ri-user-line" heading="Student" path="/student" />
          </div>
          <div className="col-lg-4 col-md-6">
            <Card icon="ri-user-4-line" heading="Teacher" path="/teacher" />
          </div>
          <div className="col-lg-4 col-md-6">
            <Card icon="ri-book-line" heading="Marks" path="/marks" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
