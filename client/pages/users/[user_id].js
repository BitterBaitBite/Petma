import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../../services/users.service';

export default function UsersList() {
	const [user, setUser] = useState({});
	const [pets, setPets] = useState([]);
	const [friends, setFriends] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const router = useRouter();
	const { user_id } = router.query;

	useEffect(() => {
		getUserData();
	}, [user_id]);

	const getUserData = () => {
		const getUser = userService.getUserById(user_id);
		const getPets = userService.getUserPetsById(user_id);
		const getFriends = userService.getUserFriendsById(user_id);

		Promise.all([getUser, getPets, getFriends])
			.then(([user, pets, friends]) => {
				console.log(pets.data);
				setUser(user.data[0]);
				setPets(pets.data);
				setFriends(friends.data);
				setIsLoaded(true);
			})
			.catch(err => {
				console.log(err);
				setIsLoaded(null);
			});
	};

	return (
		<section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			{isLoaded !== null ? (
				user ? (
					<div>
						<div>{user.name}</div>
						<div>{user.description}</div>
					</div>
				) : (
					<div>This user have no data yet</div>
				)
			) : (
				<div>There were an error retrieving the user data</div>
			)}

			{isLoaded !== null ? (
				pets && pets.length !== 0 ? (
					pets.map((pet, key) => <>{pet.name}</>)
				) : (
					<div>This user have no pets yet</div>
				)
			) : (
				<div>There were an error retrieving the data</div>
			)}

			{isLoaded !== null ? (
				friends && friends.length !== 0 ? (
					friends.map((friend, key) => <>{friend.name}</>)
				) : (
					<div>This user have no friends yet</div>
				)
			) : (
				<div>There were an error retrieving the data</div>
			)}
		</section>
	);
}
