import Image from "next/image";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Creative Thoughts Agency.</h1>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis neque
          vero eaque, vel hic odio aliquam architecto nisi, cupiditate,
          asperiores sunt? Minus quo aliquam excepturi unde! Impedit omnis
          maiores facilis.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button}>Learn more</button>
          <button className={styles.button}>Contact</button>
        </div>
        <div className={styles.brands}>
          <Image src={'/brands.png'} alt='' fill className={styles.brand}></Image>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src={'/hero.gif'} alt="" fill className={styles.heroImg}></Image>
      </div>
    </div>
  );
};

export default Home;
