import React, { useContext, useEffect, useState } from "react";
import { instance } from "../axios";
import Message, { MessageType } from "../components/messages";
import CircleLoader from "../components/CircleLoader";
import { SearchNormal1, Trash } from "iconsax-react";
import { AuthContext } from "../components/context/authContext";
import CreateMessagePage from "./createMessage";
import { API_TITLES } from "../assets/routes";

function Messages() {
  const { walletAddress } = useContext(AuthContext);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [handleError, setHandleError] = useState<{
    type: MessageType;
    message: string;
    show: boolean;
  }>({
    type: "error",
    message: "",
    show: false,
  });
  const getMessages = () => {
    setLoadingPage(true);
    instance()
      .get(API_TITLES)
      .then(({ data }) => {
        setMessages(data);
        setLoadingPage(false);
      })
      .catch((error) => {
        setLoadingPage(false);
        setHandleError({
          show: true,
          message: error.message,
          type: "error",
        });
      });
  };
  useEffect(() => {
    getMessages();
  }, []);

  const HandleCloseMessage = () => {
    setHandleError((pre) => ({
      ...pre,
      show: false,
    }));
  };
  const handleGetMessages = (data: any) => {
    setMessages((prev) => [data, ...prev]);
  };

  const handleDeleteMessage = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    instance()
      .delete(API_TITLES + "/" + id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMessages(messages.filter((item) => item._id !== id));
        }
      })
      .catch((error) => {
        setHandleError({
          message: error.message,
          show: true,
          type: "error",
        });
      });
  };
  return (
    <div className="pt-20">
      {handleError?.show && (
        <Message
          type={handleError?.type}
          message={handleError?.message}
          handleClose={HandleCloseMessage}
        />
      )}

      {loadingPage && <CircleLoader />}
      <div className="  px-5 py-5 ">
        <div className="grid grid-cols-[auto_8.5rem] items-center py-5 gap-3">
          <div className="relative">
            <input
              placeholder="Search Title"
              type="text"
              autoComplete="off"
              className="border dark:bg-dark-inputBgC dark:border-none dark:text-white w-full pl-10 border-gray-400 focus-visible:outline-none focus-visible:border-gray-600 px-3 py-2 rounded-md"
            />
            <SearchNormal1
              size={18}
              className="text-gray-500 absolute top-3 left-3 "
            />
          </div>
          <CreateMessagePage getMessage={handleGetMessages} />
        </div>
        {messages?.map((message: any) => {
          return (
            <div
              key={message._id}
              className="bg-white p-5 mt-2 rounded-lg dark:bg-dark-inputBgC dark:text-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl">{message.title}</h2>
                <button
                  disabled={walletAddress === ""}
                  id={message?._id}
                  onClick={handleDeleteMessage}
                  className={`${
                    walletAddress === ""
                      ? " text-gray-400 font-bold w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ease-linear"
                      : " font-bold text-gray-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 ease-linear"
                  } `}
                >
                  <Trash size={20} />
                </button>
              </div>
              <p className="font-normal mt-2 text-sm">{message.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Messages;
