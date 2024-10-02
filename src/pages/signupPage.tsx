import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { instance } from "../axios";
import CircleLoader from "../components/CircleLoader";
import Message, { MessageType } from "../components/messages";
import { useNavigate } from "react-router-dom";
import { API_SIGNUP } from "../assets/routes";

type Inputs = {
  email: string;
  password: string;
  name: string;
};

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(false);
  const [handleError, setHandleError] = useState<{
    type: MessageType;
    message: string;
    show: boolean;
  }>({
    type: "error",
    message: "",
    show: false,
  });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    setLoadingPage(true);
    instance()
      .post(API_SIGNUP, { ...data })
      .then(({ data }) => {
        console.log(data);
        setLoadingPage(false);
        setHandleError({
          show: true,
          message: "Sign up is Successfully",
          type: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoadingPage(false);
        setHandleError({
          show: true,
          message: error.message,
          type: "error",
        });
      });
  };

  const handleChangeRoute = () => {
    navigate("/");
  };
  const HandleCloseMessage = () => {
    setHandleError((pre) => ({
      ...pre,
      show: false,
    }));
  };
  return (
    <div className="max_width_app  grid items-center  h-screen ">
      {handleError?.show && (
        <Message
          type={handleError?.type}
          message={handleError?.message}
          handleClose={HandleCloseMessage}
        />
      )}

      {loadingPage && <CircleLoader />}
      <div className="max-w-md w-[30rem] mx-auto h-fit p-6 border border-gray-200 rounded-lg">
        <div className="grid justify-center  mb-5">
          <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
        </div>
        <h1 className="text-center font-bold text-lg dark:text-white">
          Create an account
        </h1>
        <p className="text-center font-normal text-md mt-4 dark:text-white">
          Let's create your account.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row grid mt-10">
            <label className="font-normal text-[14px] text-gray-600 mb-1 dark:text-white">
              Name <span className="text-red-500">*</span>
            </label>
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register("name", { required: true })}
              autoComplete="off"
              placeholder="Name"
              className="border dark:bg-dark-inputBgC dark:text-white dark:border-none border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
            />
            {errors.name && (
              <span className="font-normal text-[12px] text-red-400 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div className="row grid mt-5">
            <label className="font-normal text-[14px] text-gray-600 mb-1 dark:text-white">
              Email <span className="text-red-500">*</span>
            </label>
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register("email", { required: true })}
              className="border dark:bg-dark-inputBgC dark:text-white dark:border-none border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
              autoComplete="off"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className="font-normal text-[12px] text-red-400 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div className="row grid mt-5">
            <label className="font-normal text-[14px] text-gray-600 mb-1 dark:text-white">
              Password <span className="text-red-500">*</span>
            </label>
            {/* include validation with required or other standard HTML validation rules */}
            <input
              {...register("password", { required: true })}
              type="password"
              autoComplete="off"
              placeholder="Password"
              className="border dark:bg-dark-inputBgC dark:text-white dark:border-none border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <span className="font-normal text-[12px] text-red-400 pt-1">
                This field is required
              </span>
            )}
          </div>
          <div className="row grid mt-5">
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500  text-white py-[10px] font-bold  rounded-md hover:bg-blue-700 transition-all duration-300 ease-linear"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="grid grid-cols-[auto_auto_auto] items-center my-5 mt-12">
          <div className="border border-gray-200"></div>
          <p className="font-normal text-sm text-center text-gray-500">
            Already have an account ?
          </p>
          <div className="border border-gray-200"></div>
        </div>
        <div className="row grid mt-5">
          <button
            onClick={handleChangeRoute}
            className=" py-[9px] font-normal border dark:text-white border-gray-300 hover:border-blue-600 rounded-md hover:text-white hover:bg-blue-600 transition-all duration-300 ease-linear"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
