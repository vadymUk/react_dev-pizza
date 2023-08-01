import React from "react";

type CategoriesProps = {
    categoryId: number;
    onClickCategory: (ind: number) => void;
};
const Categories: React.FC<CategoriesProps> = ({
    categoryId,
    onClickCategory,
}) => {
    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className='categories'>
            <ul>
                {categories.map((val, index) => (
                    <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={categoryId === index ? "active" : ""}
                    >
                        {val}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
