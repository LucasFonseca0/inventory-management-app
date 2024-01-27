import Spinner from 'react-bootstrap/Spinner';
import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
