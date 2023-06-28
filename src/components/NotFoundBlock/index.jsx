import React from "react";
import style from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
        <>
            <span className={style.root}>😕</span>
            <br />
            <h1>notFoundBlock</h1>
        </>
    );
};

export default NotFoundBlock;
