import { useEffect, useState } from 'react';
import userService from '../../services/users.service';
import UserCard from './UserCard';

export default function UsersList() {
	const [users, setUsers] = useState();
	const [isLoaded, setIsLoaded] = useState(null);

	useEffect(() => {
		getAllUsers();
	}, []);

	const getAllUsers = () => {
		setIsLoaded(false);

		userService
			.getAllUsers()
			.then(res => {
				setUsers(res.data);
				setIsLoaded(true);
			})
			.catch(err => {
				setIsLoaded(null);
			});
	};

	return (
		<section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			{isLoaded ? (
				users.length !== 0 ? (
					users.map((user, key) => <UserCard user={user} key={key} />)
				) : (
					<div>There are no users</div>
				)
			) : (
				<div>There were an error retrieving the data</div>
			)}
		</section>
	);
}
