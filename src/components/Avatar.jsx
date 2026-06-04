import avatarImg from '../assets/avatar portrait nando.jpg';
import styles from './Avatar.module.css';

export default function Avatar() {
  return (
    <div className={styles.wrapper}>
      <img
        src={avatarImg}
        alt="Fernando Sianturi"
        className={styles.photo}
      />
    </div>
  );
}
