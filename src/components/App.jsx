import React, {Component} from "react";
import { nanoid } from "nanoid";
import { Notify } from "notiflix";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

class App extends Component {
  state = {
    contacts: [{
      id: nanoid(),
      name: "Olha",
      number: 9379992
    }],
    filter: "",
  }

  addContact = (data) => {
    const newContact = { id: nanoid(), ...data };
    this.state.contacts.some(({ name }) => {
      return name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase();
    })
      ? Notify.failure(`${newContact.name} is already in contacts`, {
        width: '230px',
        timeout: 5000,
        fontSize: '16px',
      })
      : this.setState(({ contacts }) => {
          return { contacts: [...contacts, newContact] };
        });
  }

  deleteContact = (id) => {
    this.setState(({contacts}) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      }
    })
  }

  changeFilter = ({target}) => {
    console.log('target :>> ', target);
    this.setState({
      filter: target.value,
    })
  }

  getFilteredContact() {
    const {filter, contacts} = this.state;

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({name, number}) => { 
      const normalizedName = name.toLowerCase();
      const normalizedNumber = typeof number === 'number' ? number.toString() : number.toLowerCase();
      return (normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter))
    })
    return filteredContacts;
  }

  render () {
    const {filter} = this.state; 
    const {addContact, deleteContact, changeFilter} = this;
    const contacts = this.getFilteredContact();

    return (
      <div>
        <ContactForm onSubmit={addContact}/>
        <Filter onFilter={changeFilter} filter={filter}/>     
        <ContactList contacts={contacts} deleteContact={deleteContact}/>
      </div>
    )
  }
}

export default App;