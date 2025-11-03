import CreatUser from '../user/CreateUser';

function Home() {
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 text-center font-semibold md:text-3xl">
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
