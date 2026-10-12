// libraries
import React from "react";

interface Props {
  url: string;
}

const Avatar = ({ url }: Props) => {
  return (
    <img
      style={{
        width: 72,
        height: 72,
        borderRadius: "50%",
        background: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        fontWeight: 600,
        color: "white",
      }}
      src={url}
      alt="logo"
    />
  );
};

export default Avatar;
