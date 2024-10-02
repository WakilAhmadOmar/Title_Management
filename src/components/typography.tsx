const Heading1 = ({ text, style }: { text: string; style?: string }) => {
  return (
    <h1
      className={`${style} font-semibold text-xl lg:font-bold lg:text-[24px] dark:text-white`}
    >
      {text}
    </h1>
  );
};
export { Heading1 };
