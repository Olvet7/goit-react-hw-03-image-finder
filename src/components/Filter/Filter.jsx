import { Component } from "react";
import PropTypes from 'prop-types';
import styles from './filter.module.css'

class Filter extends Component {
	static propTypes = {
		onFilter: PropTypes.func.isRequired,
		filter: PropTypes.string,
	};

	render() {
		const { filter, onFilter } = this.props;
		return (
			<div className={styles.filter}>
				<p className={styles.title}>Find contacts by name</p>
				<input 
				className={styles.input}
				placeholder="Search"
				type="text" 
				onChange={onFilter} value={filter}  />
			</div>
		)
	}
}

export default Filter;