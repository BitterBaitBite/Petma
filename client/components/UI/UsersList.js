import { useEffect, useState } from 'react';
import userService from '../../services/users.service';
import { Spinner } from '../Utils/Spinner';
import UserCard from './UserCard';

export default function UsersList() {
	const [users, setUsers] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();

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
			{isLoaded !== null &&
				(isLoaded && users.length !== 0 ? users.map((user, key) => <UserCard user={user} key={key} />) : <Spinner />)}

			{error && (
				<ErrorToast error={error} closeToast={() => setError(false)}>
					<p>We are sorry!</p>
					<p>There was an error retrieving friends and pets for you</p>
				</ErrorToast>
			)}
		</section>
	);
}
