import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./Checkout.module.css"
import { LoadingIcon } from "./Icons"
import {
  addProduct,
  getdiscountPrice,
  getProductsList,
  getStatus,
  getsummaryPrice,
  initProductsList,
  removeProcuct,
} from "./store/productsSlice"
import { hundredthsFormat } from "./utils"

const Product = memo(
  ({ id, name, availableCount, price, orderedQuantity, total }) => {
    const dispatch = useDispatch()
    const isRemoveAvailable = orderedQuantity > 0
    const isAddAvailable = orderedQuantity < availableCount

    const add = () => {
      if (isAddAvailable) {
        dispatch(addProduct({ id }))
      }
    }
    const remove = () => {
      if (isRemoveAvailable) {
        dispatch(removeProcuct({ id }))
      }
    }
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{availableCount}</td>
        <td>${price}</td>
        <td>{orderedQuantity}</td>
        <td>${hundredthsFormat(total)}</td>
        <td>
          <button
            className={styles.actionButton}
            style={{
              opacity: isAddAvailable ? "100%" : "50%",
            }}
            onClick={add}
          >
            +
          </button>
          <button
            className={styles.actionButton}
            style={{
              opacity: isRemoveAvailable ? "100%" : "50%",
            }}
            onClick={remove}
          >
            -
          </button>
        </td>
      </tr>
    )
  }
)

const Checkout = () => {
  const dispatch = useDispatch()
  const status = useSelector(getStatus)
  const products = useSelector(getProductsList)
  const summaryPrice = useSelector(getsummaryPrice)
  const discountPrice = useSelector(getdiscountPrice)

  useEffect(() => {
    dispatch(initProductsList())
  }, [])
  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {status === "loading" && <LoadingIcon />}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ id, name, availableCount, price, quantity, totalPrice }) => (
                <Product
                  key={id}
                  id={id}
                  name={name}
                  availableCount={availableCount}
                  price={price}
                  orderedQuantity={quantity}
                  total={totalPrice}
                />
              )
            )}
          </tbody>
        </table>
        <h2>Order summary</h2>
        {discountPrice !== 0 && (
          <p>Discount: $ {hundredthsFormat(discountPrice)}</p>
        )}
        <p>Total: $ {hundredthsFormat(summaryPrice)}</p>
      </main>
    </div>
  )
}

export default Checkout
