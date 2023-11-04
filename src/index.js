import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ContactForm from './components/contactForm/ContactForm';
import ContactList from './components/contactList/ContactList';
import Filter from './components/filter/Filter';
import { nanoid } from 'nanoid';

class PhoneBook extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('komponent zostal zaktualizowany');
  }

  copyContacts = this.state.contacts;

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleChangeFilterField = evt => {
    const { contacts } = this.state;
    const filterValue = evt.currentTarget.value.toLowerCase();

    this.setState({ filter: filterValue });

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );

    this.setState({ contacts: filteredContacts });

    if (evt.currentTarget.value === '') {
      this.setState({ contacts: this.copyContacts });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number, contacts } = this.state;

    const nameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert('nie');
      return;
    }

    const newContact = { id: nanoid(), name, number };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleDeleteContact = id => {
    const { contacts } = this.state;
    const updateContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: updateContacts });
  };

  render() {
    const { name, number, filter, contacts } = this.state;
    return (
      <div>
        <h1>PhoneBook</h1>
        <ContactForm
          name={name}
          number={number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        ></ContactForm>

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          handleChangeFilterField={this.handleChangeFilterField}
        ></Filter>
        <ContactList
          contacts={contacts}
          onDeleteContact={this.handleDeleteContact}
        ></ContactList>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<PhoneBook />);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
