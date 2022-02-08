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
  grid_view: true
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
  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
