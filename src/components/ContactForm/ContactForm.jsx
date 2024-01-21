import {Component} from 'react';
import PropTypes from 'prop-types';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

const INITIAL_STATE = {
    name: "",
    number: ""
}

class ContactForm extends Component {

    nameId = nanoid();
    telId = nanoid(); 

    state = {...INITIAL_STATE}

    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    reset() {
        this.setState({...INITIAL_STATE})
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.props);
        this.props.onSubmit({...this.state})
        this.reset();
    }

    render() {
        const {nameId, telId, handleSubmit, handleChange} = this;
        const {name, number} = this.state;
        return (
            <>
            <form className={css.form} onSubmit={handleSubmit}>
            <h2 className={css.title}>Phonebook</h2>
                <div className={css.formGroup}>
                    <label htmlFor={nameId}>Name</label>
                    <input 
                    value={name} 
                    name="name" 
                    onChange={handleChange} 
                    id={nameId} 
                    type="text" 
                    placeholder='Contact Name'
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required />
                </div>
                <div className={css.formGroup}>
                    <label htmlFor={telId}>Phone</label>
                    <input 
                    value={number} 
                    name="number" 
                    onChange={handleChange} 
                    id={telId }
                    type="tel" 
                    placeholder='Contact Phone'
                    pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[
						.\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
					title="Phone number must be
					digits and can contain spaces, dashes, parentheses and can start with +"
                    required />
                </div>
                <button type="submit" className={css.button}>Add contact</button>
            </form>
            </>
        )
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
       };
}


export default ContactForm;