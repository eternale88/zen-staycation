import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  //user can have the same product but with different colors, so we concate id + color to make that unique
  switch (action.type) {
    case ADD_TO_CART:
      const {id, color, amount, product } = action.payload
      const tempItem = state.cart.find((item) => item.id === id + color)
      if(tempItem) {
        const tempCart = state.cart.map((cartItem) => {
        if(cartItem.id === id + color) {
            //console.log(cartItem.id, id)
            let newAmount = cartItem.amount + amount
            //check to make sure enough items in stock, if not, set to max
            if(newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return {...cartItem, amount: newAmount}
          }
          else {
            //if we aren't updating amount return cart item as is
            //seems redundant, but maybe important 
            return cartItem
          }
        })
        return {...state, cart: tempCart }
      }
      else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock
        }
        return {...state, cart: [...state.cart, newItem]}
      }
      //end add to cart

      case REMOVE_CART_ITEM:
        let tempCart = state.cart.filter((item) => item.id !== action.payload)
        return {...state, cart: tempCart}

      case CLEAR_CART:
        return {...state, cart: []}

      case TOGGLE_CART_ITEM_AMOUNT: 
        return {...state, cart: [...state.cart, {amount: action.payload.value}]}

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
    }
}

export default cart_reducer
