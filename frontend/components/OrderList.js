import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetOrdersQuery } from '../state/ordersApi'
import { setSize } from '../state/ordersSlice'

export default function OrderList() {
  
  const pizzaSize = useSelector(st => st.ordersState.size)
  const dispatch = useDispatch()
  const { data: orders, isLoading: gettingOrders, isFetching: refreshingOrders } = useGetOrdersQuery();
  
  //To filter and display orders based on the selected size
  const filterOrders = pizzaSize === 'All' 
    ? orders 
    : orders?.filter(order => order.size === pizzaSize);

  console.log(orders)
  console.log(pizzaSize)
  
  return (
    <div id="orderList">
      <h2>Pizza Orders
        {(gettingOrders || refreshingOrders) && ' loading...'}
      </h2>
      <ol>
        {
          filterOrders?.map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} with 
                  ${(!order.toppings?.length) ? 'no' : order.toppings?.length} 
                  ${(order.toppings?.length !== 1) ? `toppings` : 'topping'}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === pizzaSize ? ' active' : ''}`

            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(setSize(size === 'All' ? 'All' : size))}
              >
                {size}
            </button>
          })
        }
      </div>
    </div>
  )
}
