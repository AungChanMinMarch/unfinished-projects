import React from "react"
import { Link, useNavigate } from "react-router-dom"

import './Home.css'
import { Navbar, Slug } from '@app/components'
import {client} from '@app/sanity_client'
import { novelsQuery } from '@app/utils/data'
// update view
const Home = ()=>{
    const [user, setUser] = React.useState(null);
    const [novels, setNovels] = React.useState();
    const navigate = useNavigate();

    React.useEffect(()=>{
    	const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    	if(!userInfo){
    		console.log('no info => no request')
    		navigate('/auth')
    	}
    	const userId = userInfo?.googleId;
    	if(!userId){
    		console.log("there is no user. please create one");
    		localStorage.clear();
    		navigate('/auth')
    	}
    	console.log('requesting data');
    	const query = novelsQuery(userId)
    	client.fetch(query).then(data=>{
    		setUser(true);
    		setNovels(data);
    		console.log(data);
    	}).catch(err => console.log(err));
    },[user])
    
	return (
		<div>
			<Navbar isLogin = {user} setUser={setUser}/>
			{
			!novels
				? <div className='loading'>Fetching novels please wait</div>
				: (novels.length === 0) 
					? <div>You have successfully logged in. Please add icon to create new novel. </div>
					: novels.map(novel => 
						<Slug 
							key={novel._id} 
							text={novel.name} 
							id={novel._id}
							type="novel"
							setter={setNovels}
						/>
					)
			}
			<Link className="addIcon" to="/addnovel">
				Add
			</Link>
		</div>
	)
}
export default Home