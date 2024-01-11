import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

import useAxiosPrivate from "../../Hooks/UseAxiosPrivate";

const socket = io("https://skillsail.sudhindevan.com/");

const ChatUi = ({ recipientId, recipient }) => {
  const axiosPrivate = useAxiosPrivate();
  const authState = useSelector((state) => state.user);

  const [conversationId, setConversationId] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [textMessage, setTextMessage] = useState("");

  const handleSendMessage = () => {
    if (textMessage.trim() === "") {
      alert("fill the form");
      return;
    }
    const newMessage = {
      // senderId: authState.userId,
      content: textMessage,
      timeStamps: new Date().toISOString(),
      sender: {
        _id: authState.id,
      },
    };

    if (allMessages) {
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    } else {
      setAllMessages([newMessage]);
    }

    console.log("d", conversationId);
    socket.emit("sendMessage", {
      textMessage,
      conversationId,
      recipientId,
      senderSocketId: socket.id,
      token: authState.token,
      userId: authState.id
    });

    setTextMessage("");
  };

  useEffect(() => {
    (async () => {
      const data = await axiosPrivate.get(`/chat/message/${recipientId}`);

      setConversationId(data?.data?.conversationId);

      setAllMessages(data?.data?.messages);

      socket.emit("joinRoom", data?.data?.conversationId);
    })();

    return () => {
      socket.off("receiveMessage");
    };
  }, [recipientId]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      const newMessage = {
        senderId: authState.id,
        content: data.textMessage,
        timeStamps: new Date().toISOString(),
      };

      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  });

  return (
    <>
      <div className="bg-gray-100 p-4 flex rounded-t-2xl border-b-2 border-gray-300 text-lg font-semibold">
        <img
          style={{
            backgroundImage: `url(${recipient?.profilePic?.url})` || "img",
          }}
          className="w-10 h-10 bg-center bg-cover rounded-full"
        />
        <span className="flex pt-1 pl-3">{recipient?.name}</span>
      </div>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-b-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto overflow-y-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {allMessages &&
                allMessages.map((message, i) =>
                  message?.sender?._id === authState?.id ? (
                    <div
                      key={i}
                      className="col-start-6 col-end-13 p-3 rounded-lg"
                    >
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                          <div>{message.content}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="col-start-1 col-end-8 p-3 rounded-lg"
                    >
                      <div className="flex flex-row items-center">
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{message?.content}</div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              <div className="col-start-1 col-end-8 p-3 rounded-lg">
                <div className="flex flex-row items-center"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-4">
            <Button
              disabled={textMessage.trim() === "" ? true : false}
              className="flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded-xl text-white px-6 py-3 flex-shrink-0"
              onClick={handleSendMessage}
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

ChatUi.propTypes = {
  recipientId: PropTypes.string.isRequired,
  recipient: PropTypes.object,
};

export default ChatUi;
