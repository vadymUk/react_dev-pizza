import React from "react";
import style from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
        <div className={style.root}>
            <span>😕</span>
            <br />
            <h1>Not found!!!</h1>
        </div>
    );
};

export default NotFoundBlock;
