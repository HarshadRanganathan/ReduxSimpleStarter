import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
    renderList() {
        return this.props.book.map((book) => {
            return (
                <li 
                    key={book.title} 
                    onClick={() => this.props.selectBook(book)}
                    className="list-group-item">{book.title}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}

// returned values are available as props
function mapStateToProps(state) {
    return {
        book: state.books
    };
}

// returned values are available as props
function mapDispatchToProps(dispatch) {
    // pass result to all of reducers
    return bindActionCreators({
        selectBook: selectBook
    }, dispatch);
}

// connect REACT component with REDUX store
export default connect(mapStateToProps, mapDispatchToProps)(BookList);