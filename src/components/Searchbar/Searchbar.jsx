import css from './searchbar.module.css'
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import PropTypes from 'prop-types';

class Searchbar extends Component {
	state = {
		search: '',
	}

	handleChange = e => {
		this.setState({search: e.currentTarget.value.toLowerCase()})
	}
	
	handleSubmit = e => {
		e.preventDefault();

		if(this.state.search.trim() === ''){
			return toast.error('😎 Enter your text please');
		}

		this.props.onSubmit(this.state.search);
		this.setState({search: ""})
	}
	
	render(){
		const {handleChange, handleSubmit} = this;
		const {search} = this.state; 
		return (
			<header className={css.searchbar}>
				<form className={css.form} onSubmit={handleSubmit}>
					<button type="submit" className={css.button}>
					<span className={css.buttonLabel}>Search</span>
					</button>
	
					<input
					onChange={handleChange}
					value={search}
					name="search"
					className={css.input}
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
					/>
				</form>
			</header>
		);
	}
}

export default Searchbar;