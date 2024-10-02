const CircularLoader = () => {
  return (
    <div className="fixed flex justify-center items-center left-0 z-20 h-screen w-screen bg-[#9ca3af75]">
      <div className="relative h-fit w-fit">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default CircularLoader;
