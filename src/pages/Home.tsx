import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import qs from "qs";
import { SearchPizzaParams, fetchPizzas } from "../redux/slices/pizzaSlice";

const Home: React.FC = () => {
    const categoryId = useSelector((state: any) => state.filter.categoryId);
    const sortType = useSelector(
        (state: any) => state.filter.sort.sortProperty
    );
    const { currentPage, searchValue } = useSelector(
        (state: any) => state.filter
    );
    const items = useSelector((state: any) => state.pizza.items);
    const status = useSelector((state: any) => state.pizza.status);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (num: number) => {
        dispatch(setCurrentPage(num));
    };

    const sortBY = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    const getPizzas = async () => {
        dispatch(fetchPizzas({ sortBY, order, category, search, currentPage }));

        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.slice(1)
            ) as unknown as SearchPizzaParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortBY);

            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort ? sort : list[0],
                })
            );
            isSearch.current = true;
        }
    }, [dispatch]);

    React.useEffect(() => {
        getPizzas();

        isSearch.current = false;

        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        categoryId,
        sortType,
        sortBY,
        order,
        category,
        searchValue,
        search,
        currentPage,
    ]);
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, currentPage, navigate, sortType]);
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
            {status === "error" ? (
                <div className='content__error-info'>
                    <h2>Произошла ошибка 😕</h2>
                    <p>Не удалось загрузить питсы!!!</p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === "loading"
                        ? [...new Array(6)].map((_, index) => (
                              <Skeleton key={index} />
                          ))
                        : items.map((obj: any) => (
                              <PizzaBlock
                                  key={obj.id}
                                  id={obj.id}
                                  title={obj.title}
                                  price={obj.price}
                                  imageUrl={obj.imageUrl}
                                  sizes={obj.sizes}
                                  types={obj.types}
                              />
                          ))}
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                onChangePage={onChangePage}
            />
        </div>
    );
};

export default Home;
