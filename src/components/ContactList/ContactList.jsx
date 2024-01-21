import PropTypes from 'prop-types';
import styles from './contactList.module.css'

const ContactList = ({contacts, deleteContact}) => {
    const elements = contacts.map(({id, name, number}) => <li className={styles.li} key={id}>{name}: {number} <button className={styles.button}onClick={() => deleteContact(id)} type="button">Delete</button></li>)
    return (
        <div className={styles.form}>
            <h2 className={styles.title}>Contacts</h2>
            <ol className={styles.elements}>
                {elements} 
            </ol>
        </div>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteContact: PropTypes.func.isRequired,
};

export default ContactList;