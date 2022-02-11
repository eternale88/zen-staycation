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
      //set max and min price of respective product initally for filters
      let maxPrice = action.payload.map((prod) => prod.price) //return arr of prices
      //get most expensive product, use spread because array can't be accepted to .max
      maxPrice = Math.max(...maxPrice)
      //console.log(maxPrice)

      //set max to max and current default on range slider (current price) will be max as well, and copy previous values from our state for filters
    return {
      ...state,
      //important to spread out (for all_prod and filtered_prod), or we wouldn't be able to get back to default list, after filtering due to js refering to the same place in memory everytime(in place mutation), now it will refer to most previous state first, very important in this relationship between filtered and default unfiltered product list - the spread is simply copying values rather than refering to the same place in memory
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        price: maxPrice,
        max_price: maxPrice
      }
    }
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true
      }
      case SET_LISTVIEW:
        return {
          ...state,
          grid_view: false
        }
      case UPDATE_SORT:
        return {
          ...state,
          sort: action.payload
        }
      case SORT_PRODUCTS:
        const { sort, filtered_products } = state

        //update array based on sorting type
        //destructure filtered products initially just in case there's a scenario where none match some will be displayed, otherwise the tempProducts sorted are passed in in return so they will be displayed
        let tempProducts = [...filtered_products]
        if(sort === 'price-lowest') {
          tempProducts.sort((a, b) => a.price - b.price)
        }
        if(sort === 'price-highest') {
          tempProducts.sort((a, b) => b.price - a.price)
        }
        if(sort === 'name-a') {
          tempProducts = tempProducts.sort((a, b) => {
            //cool method that compares value of 2 string values
            return a.name.localeCompare(b.name)
          })
        }
        if(sort === 'name-z') {
          tempProducts = tempProducts.sort((a, b) => {
            //cool method that compares value of 2 string values
            return b.name.localeCompare(a.name)
          })
        }
        return {
          ...state,
          filtered_products: tempProducts
        }
        case UPDATE_FILTERS:
          const {name, value} = action.payload
          return {
            ...state,
            filters: {
              ...state.filters,
              //[name] dynamic prop es6, it will be whatever we need it to be, for different filters
              [name]: value
            }
          }
        case FILTER_PRODUCTS:
          //console.log('filter reducer called')
          const { all_products } = state
          const { text, category, company, color, price, shipping } = state.filters 
          //console.log(state.filters)

          //start with fresh set of data where we have all of the products, and then filter them

          let filteredProducts = [...all_products]
          //text filtering
          if(text) {
            filteredProducts = filteredProducts.filter((p) => {
              //return values that start with text user has typed in
              return p.name.toLowerCase().startsWith(text)
            })
          }
          
          //return newly filtered products
          return {
            ...state,
            filtered_products: filteredProducts
          }
        case CLEAR_FILTERS:
          return {
            ...state,
            filters: {
              ...state.filters,
              text: '',
              company: 'all',
              category: 'all',
              color: 'all',
              price: state.filters.max_price,
              shipping: false
            }
          }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
