export const Indicators = ({time}) => {
  return (
    <section className="grid grid-cols-7 w-[80%] place-content-center place-items-center">
      <span className="supersm:text-5xl text-[42px] text-white">
        {("0" + Math.floor(time / 3600000)).slice(-2)}
      </span>

      <span className="supersm:text-5xl text-[42px] text-white">:</span>

      <span className="supersm:text-5xl text-[42px] text-white">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
      </span>

      <span className="supersm:text-5xl text-[42px] text-white">:</span>

      <span className="supersm:text-5xl text-[42px] text-white">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>

      <span className="supersm:text-5xl text-[42px] text-white">:</span>

      <span className="supersm:text-5xl text-[42px] text-white">
        {" "}
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </section>
  );
};
