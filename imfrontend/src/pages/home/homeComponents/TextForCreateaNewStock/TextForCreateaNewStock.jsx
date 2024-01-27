import { Link } from 'react-router-dom'
import styles from './TextForCreateaNewStock.module.css'
import SubmitButton from '../../../../components/submitButton/submitButton'

export default function TextForCreateaNewStock(){


    return( 
        <div className={styles.TextForCreateaNewStock} >
            <h1>Create your first stock:</h1>
            <p>Streamline your business operations today! Create your first stock item and experience the ease of inventory management.</p>

            <Link to="/createNewStock">
                <SubmitButton>Create a new stock</SubmitButton>
            </Link>
        </div>
    )
} 