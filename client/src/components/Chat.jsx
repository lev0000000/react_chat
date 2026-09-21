import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import icon from "../assets/images/emoji.png";
import Message from "./Message";
const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [state, setState] = useState([]);
  const { search, state:file } = useLocation();
  const [params, setParams] = useState([]);
  const [message, setMessage] = useState([""]);
  const [onlineUsers, setOnlineUsers] = useState(0);
  // const [userMessage, setUserMessage] = useState([]);
  // const [viewMessage, setViewMessage] = useState([{ name: "", message: "" }]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    console.log(searchParams, file)
    setParams(searchParams);
    socket.emit("join", {searchParams:searchParams, file:file});
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      const { user, message, countOnline } = data;
      setState((state) => [...state, { user, message }]);
      setOnlineUsers(countOnline)
    });
  }, []);

  const navigate = useNavigate();

  const handlerEmoji = ({ emoji }) => {
    setMessage(`${message} ${emoji}`);
  };

  const changeMessage = (e) => {
    setMessage(e);
  };

  const sendMessage = () => {
    socket.emit("SendMessage", { params, message });
    console.log({ params, message });

    setMessage("");
  };

  const leftRoom = () => {
    socket.emit("delSession", {params})
    navigate("/");
  };

  return (
    <div>
      <div className="min-w-[800px]">
        <div className="flex justify-between gap-3 items-center">
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Chat of Room {params.room}
            </span>
          </h1>
          <span className="text-white"> {onlineUsers} users in this room</span>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => leftRoom()}
          >
            Left the chat
          </button>
        </div>

        <div className="min-h-[600px] flex flex-col gap-4 ">
          {state.map((item) => (
            <Message
              user={item.user}
              message={item.message}
              params={params}
              key={Date.now}
            />
          ))}
        </div>
        <form action="">
          <div className="flex relative ">
            <input
              className="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="username"
              placeholder="What do you want write"
              value={message}
              onChange={(e) => changeMessage(e.target.value)}
              autoComplete="off"
            />{" "}
            w
            <div className="w-8 h-8 absolute inset-y-0 right-3 top-1 w-16 z-1">
              <button type="button" onClick={() => setIsOpen(!isOpen)}>
                <img src={icon} alt="" />
              </button>
            </div>
          </div>
          <div className="">
            <div className="absolute bottom-[160px] right-[550px]">
              {isOpen && (
                <EmojiPicker
                  className=""
                  onEmojiClick={(e) => handlerEmoji(e)}
                />
              )}
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-3  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => sendMessage()}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
