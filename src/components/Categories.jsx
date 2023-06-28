import React from "react";

const Categories = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    const onClickCategory = (ind) => {
        setActiveIndex(ind);
    };

    return (
        <div className='categories'>
            <ul>
                {categories.map((val, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={activeIndex === index ? "active" : ""}
                    >
                        {val}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
