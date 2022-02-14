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
        const {id: itemId, value} = action.payload
        // const tempItemToggle = state.cart.find((item) => item.id === itemId)
        const temporaryCart = state.cart.map((item) => {
          if(item.id === itemId) {
            if(value === "inc") {
              let newAmount = item.amount + 1
              if(newAmount > item.max) {
                newAmount = item.max
              }
              return {...item, amount: newAmount}
            }
            if(value === "dec") {
              let newAmount = item.amount - 1
              if(newAmount < 1) {
                newAmount = 1
              }
              return {...item, amount: newAmount}
            }

          } else {
            //if not toggling return item as is
            return item
          }
        })
        
        return {...state, cart: temporaryCart }
        //end of toggle cart amount

        //count totals
        case COUNT_CART_TOTALS:
          const {total_items, total_amount} = state.cart.reduce((total, cartItem) => {
            const {amount, price} = cartItem
            //get amount of items
            total.total_items += amount
            //get price of those items
            total.total_amount += price * amount
            //always return total(accumulator) with reducer or will break
            return total
          }, {total_items: 0, total_amount: 0})
          return {...state, total_amount, total_items} 

    default:
      throw new Error(`No Matching "${action.type}" - action type`)
    }
}

export default cart_reducer
