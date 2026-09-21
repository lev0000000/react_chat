import React from "react";

export default function Message({ user, message, params }) {
  return (
    <div className={params.name === user.name ? "flex items-start justify-end gap-2.5" : "flex items-start justify-start gap-2.5"}>
      <div className="flex flex-col w-full max-w-[320px] leading-1.5">
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <span className="text-sm text-white font-semibold text-heading">
            {user.name}
          </span>
          <span className="text-sm text-zinc-100 text-body">{}</span>
        </div>
        <p className="text-sm py-2 text-heading text-white"> {message}</p>
        <span className="text-sm text-zinc-400  text-body">Delivered</span>
      </div>
    </div>
  );
}
