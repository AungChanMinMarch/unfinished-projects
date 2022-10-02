import React from "react"
import ReactDOM from "react-dom"
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

// import { getNovelsBySearch } from '../../actions/novels';
import './Home.css'
import { Navbar, Auth, AddBtn } from '@app/components/index.js'

const Home = ()=>{
	const user = true;
	// const dispatch = useDispatch();
	// const novels = [{name: "DE", id: 1}];
	const novels = []
	const getBody =()=>{
		if(!user) return <Auth />;
		if(user && novels.length === 0) return [<div>You have successfully logged in. Please add icon to create new novel. </div>, <AddBtn />]
		if(user &&novels.length > 0) return novels.map(novel => <div key={novel.id}>{novel.name}</div>) 
	}
	return (
		<>
			<Navbar isLogin = {user}/>
			{getBody()}
		</>
	)
}
export default Home