import CreatUser from '../user/CreateUser';

function Home() {
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-center font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreatUser />
    </div>
  );
}

export default Home;
