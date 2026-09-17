import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import icon from "../assets/images/emoji.png";
const socket = io.connect("http://localhost:5000");

export default function Chat() {
  const [state, setState] = useState([]);
  const { search } = useLocation();
  const [params, setParams] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);

    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      const { user, message } = data;
      setState((state) => [...state, { user, message }]);
    });
  }, []);

  const leftRoom = () => {};
  const handelClick = () => {};
  const onEmojiClick = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  const handleSend = () => {};

  console.log(state);

  return (
    <div>
      <div className="min-w-[800px]">
        <div className="flex justify-between gap-3 items-center">
          <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Chat of Room {params.room}
            </span>
          </h1>
          <span className="text-white">0 users in this room</span>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Left the chat
          </button>
        </div>

        <div className="min-h-[900px] flex flex-col gap-4 ">
            <span className="text-white">
                {state.map((item) => item.message)}
            </span>
        </div>
        <form action="">
          <div className="flex relative ">
            <input
              className="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="username"
              placeholder="What do you want write"
              value={message}
              autoComplete="off"
              required
            />
            <div className="w-8 h-8 absolute inset-y-0 right-3 top-1 w-16 z-1">
              <button>
                <img src={icon} alt="" />
              </button>
            </div>
          </div>
          <div className="">
            <div className="">
              {isOpen && <EmojiPicker onEmojiClick={onEmojiClick()} />}
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-3  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={(e) => handleSend(e)}
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
