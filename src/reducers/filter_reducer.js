import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  switch (action.type) {
    case LOAD_PRODUCTS:
    return {
      ...state,
      //important to spread out, or we wouldn't be able to get back to default list, after filtering due to js refering to the same place in memory everytime, now it will refer to most previous state first, very important in this relationship between filtered and default unfiltered product list - the spread is simply copying values rather than refering to the same place in memory
      all_products: [...action.payload],
      filtered_products: [...action.payload]
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
