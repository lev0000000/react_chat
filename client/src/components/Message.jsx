import React from "react";

export default function Message({ user, message, params }) {
  return (
    <div
      className={
        params.name === user.name
          ? "flex items-start justify-end gap-2.5"
          : "flex items-start justify-start gap-2.5"
      }
    >
      <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <img
          className="w-8 h-8 rounded-full"
          src={`/avatars/${user.name}.webp`}
          alt={`${user.name}`}
        />
        <span class="text-sm font-semibold text-gray-900 dark:text-white">
          {user.name}
        </span>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
        {message}
      </p>
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
        Delivered
      </span>
    </div>
          </div>

  );
}
