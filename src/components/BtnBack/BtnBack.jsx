import Link from "next/link"
import styles from "../header/header.module.css"
import stylesBtn from "../BtnBack/btnBack.module.css"


export const BtnBack = () => {
  return (
    <div className={stylesBtn.btnBackContainer}>
        <Link href="/">
            <button className={styles.bookmarkBtn}>
                <span className={styles.IconContainer}>
                <i className='bx bx-left-arrow-alt'></i>
                </span>
                <p className={styles.titleBtn}>Volver al inicio</p>
            </button>
        </Link>
  </div>
  )
}

