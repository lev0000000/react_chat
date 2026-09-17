import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Main() {
  const FIELD = {
    NAME: "name",
    ROOM: "room",
  };

  const { NAME, ROOM } = FIELD;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((value) => !value);
    if(isDisabled)e.preventDefault()
  };

  return (
    <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-5 ">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Chat with me!
      </h1>
      <form action="" className="flex flex-col items-center gap-5 w-100">
        <div className="">
          <input
            className="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Name"
            value={values[NAME]}
            autoComplete="off"
            onChange={(e) => handleChange(e.target.value, "name")}
            required
          />
        </div>
        <div className="">
          <input
            className="bg-gray-50 w-96 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="username"
            placeholder="Room"
            value={values[ROOM]}
            autoComplete="off"
            onChange={(e) => handleChange(e.target.value, "room")}
            required
          />
        </div>
        <Link to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
          <button
            type="submit"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-20 py-3  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={(e) => handleClick(e)}
          >
            Join
          </button>
        </Link>
      </form>
    </div>
  );
}
