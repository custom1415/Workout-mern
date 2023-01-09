export const FormInput = ({
  id,
  name,
  type,
  autocomplete,
  placeholder,
  children,
  ...rest
}) => {
  const disableNumIncreaseonScroll = (e) => {
    e.target.blur();
  };
  return (
    <>
      <label htmlFor={children} className="sr-only">
        {children}
      </label>
      <input
        onWheel={disableNumIncreaseonScroll}
        id={id}
        name={name}
        type={type}
        className="relative block  z-10 w-full appearance-none rounded border-2 border-gray-800 px-3 py-2 text-gray-800 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        placeholder={placeholder}
        required
        {...rest}
      />
    </>
  );
};
