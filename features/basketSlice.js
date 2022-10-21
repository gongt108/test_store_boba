import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  cartPrice: 0.00
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: {
        reducer: (state, action) => {
            state.items = [...state.items, action.payload]
            state.cartPrice += action.payload.totalPrice
            console.log(state.cartPrice)
            },
        prepare: (item) => {
            const id = nanoid()
            return { payload: { id, ...item }}
        },
    },
    removeFromBasket: (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        let newBasket = [...state.items];

        if(index >= 0) {
            newBasket.splice(index, 1);
        } else {
            console.warn(
                `Item not in basket. Try again.`
            )
        }
      state.items = newBasket;
      state.cartPrice -= action.payload.totalPrice
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectedBasketItems = state => state.basket.items;
export const totalBasketPrice = state => state.basket.cartPrice;

export default basketSlice.reducer;