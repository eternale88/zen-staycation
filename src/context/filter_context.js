import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products:[],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  //need products from it's context for showing product page list for filtering, will also have other instance for default list of total products
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)

  //way of loading list of products from other hook into this context custom hook, rules of hook, hook can only be accessed in a component or other hook
  useEffect(() => {
   dispatch({type: LOAD_PRODUCTS, payload: products})
  }, [products])

  //sort products when product array is updated, and when sort type changes
  useEffect(() => {
    dispatch({ type:SORT_PRODUCTS })
  }, [products, state.sort])

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW})
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW})
  }

  const updateSort = (e) => {
    //for demonstration, useful to have name for filtering, here only have one select element and value
    //const name = e.target.name 
    const value  = e.target.value
    dispatch({type: UPDATE_SORT, payload: value})
  }
  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
