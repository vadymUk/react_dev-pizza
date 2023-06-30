import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItem] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: "популярности",
        sortProperty: "rating",
    });

    const sortBY = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    React.useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas?${category}&sortBy=${sortBY}&order=${order}`
        )
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItem(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, sortBY, order, category]);
    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(id) => setCategoryId(id)}
                />
                <Sort
                    sortType={sortType}
                    onClickSortType={(id) => setSortType(id)}
                />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items.map((obj) => (
                          <PizzaBlock
                              key={obj.id}
                              title={obj.title}
                              price={obj.price}
                              imageUrl={obj.imageUrl}
                              sizes={obj.sizes}
                              types={obj.types}
                          />
                      ))}
            </div>
        </div>
    );
};

export default Home;
