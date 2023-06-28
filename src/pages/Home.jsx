import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
    const [items, setItem] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch("https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas")
            .then((res) => {
                return res.json();
            })
            .then((arr) => {
                setItem(arr);
                setIsLoading(false);
            });
    }, []);
    return (
        <>
            <div className='content__top'>
                <Categories />
                <Sort />
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
        </>
    );
};

export default Home;
