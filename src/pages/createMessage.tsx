import { CloseSquare } from "iconsax-react";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Message, { MessageType } from "../components/messages";
import { instance } from "../axios";
import { AuthContext } from "../components/context/authContext";
import { API_TITLES } from "../assets/routes";
import CircleLoader from "../components/CircleLoader";

type Inputs = {
  title: string;
  description: string;
};

const CreateMessagePage = ({
  getMessage,
}: {
  getMessage: (data: any) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { walletAddress } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = () => setIsOpen(!isOpen);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    setLoadingPage(true);
    instance()
      .post(API_TITLES, { ...data })
      .then(({ data }) => {
        console.log(data);
        setLoadingPage(false);
        getMessage(data);
        setHandleError({
          show: true,
          message: "Message create is Successfully",
          type: "success",
        });
        openModal();
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

  const HandleCloseMessage = () => {
    setHandleError((pre) => ({
      ...pre,
      show: false,
    }));
  };
  return (
    <div>
      {handleError?.show && (
        <Message
          type={handleError?.type}
          message={handleError?.message}
          handleClose={HandleCloseMessage}
        />
      )}

      {loadingPage && <CircleLoader />}
      <div className="flex items-center justify-center w-fit ">
        {/* Page Content */}
        <button
          onClick={openModal}
          className={`${
            walletAddress === ""
              ? " text-white bg-gray-400 font-normal px-5 py-2 rounded-md  transition-all duration-300 ease-linear"
              : "text-white bg-blue-500 font-normal px-5 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-linear"
          } `}
          disabled={walletAddress === ""}
        >
          Add Message
        </button>

        {/* Popup Modal */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
            onClick={openModal} // Close modal when clicking outside
          >
            <div
              className="bg-white rounded-lg  max-w-lg w-full transform transition-all duration-300 ease-out scale-100"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              {/* Feed Animation */}
              <div
                className={`transform transition-all duration-300 ease-out ${
                  isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <div className="flex justify-between items-center h-14 shadow-sm px-6">
                  <h2 className="text-xl font-bold ">Popup Content</h2>
                  <CloseSquare
                    className="cursor-pointer hover:text-blue-500 transition-all duration-300 ease-linear"
                    onClick={openModal}
                  />
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row grid ">
                      <label className="font-normal text-[14px] text-gray-600 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      {/* register your input into the hook by invoking the "register" function */}
                      <input
                        type="text"
                        placeholder="Title Message"
                        {...register("title", { required: true })}
                        className="border border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
                      />
                      {errors.title && (
                        <span className="font-normal text-[12px] text-red-400 pt-1">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="row grid mt-5">
                      <label className="font-normal text-[14px] text-gray-600 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      {/* include validation with required or other standard HTML validation rules */}
                      <textarea
                        {...register("description", { required: true })}
                        placeholder="Write a message about your title"
                        className="border border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
                      />
                      {/* errors will return when field validation fails  */}
                      {errors.description && (
                        <span className="font-normal text-[12px] text-red-400 pt-1">
                          This field is required
                        </span>
                      )}
                    </div>
                  </form>
                </div>
                <div className="flex gap-4 justify-end px-6 py-5">
                  <button
                    className="mt-4 px-4 py-2  text-gray-500 hover:text-blue-500 border rounded-md hover:border-blue-500 transition-all duration-300 ease-linear"
                    onClick={openModal}
                  >
                    Canncel
                  </button>
                  <button
                    className="mt-4 px-7 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 ease-linear"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMessagePage;
