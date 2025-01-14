import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  console.log(auth);

  return (
    <div className="z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center w-full">
      <p className="font-semibold text-xl">WorkDirecz</p>
      <div className="flex items-center gap-5">

        <Tooltip title={auth.user.email} arrow>
          <div className="flex items-center gap-2">
            <p className="font-lg text-lg cursor-pointer">{auth.user.fullName}</p>
            <Avatar alt="User" src="https://shorturl.at/ns7mc" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
