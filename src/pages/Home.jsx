import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";

const Home = () => {
    const categoryId = useSelector((state) => state.filter.categoryId);
    const sortType = useSelector((state) => state.filter.sort.sortProperty);
    const courrentPage = useSelector((state) => state.filter.pageCount);
    const dispatch = useDispatch();

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (num) => {
        dispatch(setPageCount(num));
    };

    const sortBY = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    React.useEffect(() => {
        setIsLoading(true);
        // fetch(
        //     `https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas?page=${courrentPage}&limit=4&${category}&sortBy=${sortBY}&order=${order}${search}`
        // )
        //     .then((res) => {
        //         return res.json();
        //     })
        //     .then((arr) => {
        //         setItem(arr);
        //         setIsLoading(false);
        //     });
        axios
            .get(
                `https://637cfd3b9c2635df8f7f0355.mockapi.io/pizzas?page=${courrentPage}&limit=4&${category}&sortBy=${sortBY}&order=${order}${search}`
            )
            .then((res) => {
                setItems(res.data);
                setIsLoading(false);
            });

        window.scrollTo(0, 0);
    }, [
        categoryId,
        sortType,
        sortBY,
        order,
        category,
        searchValue,
        search,
        courrentPage,
    ]);
    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
                {isLoading
                    ? [...new Array(6)].map((_, index) => (
                          <Skeleton key={index} />
                      ))
                    : items
                          //   .filter((ob) => {
                          //       if (
                          //           ob.title
                          //               .toLowerCase()
                          //               .includes(searchValue.toLowerCase())
                          //       ) {
                          //           return true;
                          //       }
                          //       return false;
                          //   })
                          .map((obj) => (
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
            <Pagination
                currentPage={courrentPage}
                onChangePage={onChangePage}
            />
        </div>
    );
};

export default Home;
