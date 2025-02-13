import React from "react";
/* import PropTypes from "prop-types"; */
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import Iconbar from "./Iconbar";

export default function Header() {
  const { login } = useLogin();
  const viewerGroup =
    login?.usergroups instanceof Array ? login?.usergroups[0] : null;

  return login?.first_name || login?.last_name ? (
    <div>
      {viewerGroup !== "user" ? (
        <Navbar
          first_name={
            Array.isArray(login.first_name)
              ? login.first_name[0]
              : login.first_name
          }
          last_name={login.last_name}
        />
      ) : null}
      
    </div>
  ) : (
    <div>
      <Iconbar />
    </div>
  );
}
