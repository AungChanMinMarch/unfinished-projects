import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPostsBySearch } from '../../actions/posts';
// import Posts from '../Posts/Posts';
// import Form from '../Form/Form';
// import Pagination from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return ( 
      <div>
        <div maxWidth = "xl" >
          <div div justify = "space-between"
        alignItems = "stretch"
        spacing = { 3 } className = { classes.divdiv } >
        <
        div item xs = { 12 } sm = { 6 } md = { 9 } >
        <
        Posts setCurrentId = { setCurrentId }
        /> <
        /div> <
        div item xs = { 12 } sm = { 6 } md = { 3 } >
        <
        div className = { classes.divSearch } position = "static"
        color = "inherit" >
        <
        div onKeyDown = { handleKeyPress } name = "search"
        variant = "outlined"
        label = "Search Memories"
        fullWidth value = { search } onChange = {
            (e) => setSearch(e.target.value) }
        /> <
        div style = { { margin: '10px 0' } } value = { tags } onAdd = {
            (chip) => handleAddChip(chip) } onDelete = {
            (chip) => handleDeleteChip(chip) } label = "Search Tags"
        variant = "outlined" /
        >
        <
        div onClick = { searchPost } className = { classes.searchdiv } variant = "contained"
        color = "primary" > Search < /div> <
        /div> <
        Form currentId = { currentId } setCurrentId = { setCurrentId }
        /> {
            (!searchQuery && !tags.length) && ( <
                div className = { classes.pagination } elevation = { 6 } >
                <
                Pagination page = { page }
                /> <
                /div>
            )
        } <
        /div> <
        /div> <
        /div> <
        /div>
    );
};

export default Home;