import React from "react";
import '../index.css'

const Title = ({title}) => {
    return (
        <div className="flex justify-center items-center mt-10">
            <h1 className="gradient-text text-[50px]  font-extrabold">{title}</h1>
        </div>
    );
}

export default Title;
