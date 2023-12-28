import Link from "next/link";
import React, { ReactNode } from "react";
import classes from "./button.module.css";

type buttonPropsType = {
  link?: string;
  children: ReactNode;
};

const Button = (props: buttonPropsType) => {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  }

  return <button className={classes.btn}>{props.children}</button>;
};

export default Button;
