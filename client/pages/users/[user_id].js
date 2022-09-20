import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../../services/users.service';
import { Spinner } from '../../components/Utils/Spinner';
import styled from 'styled-components';
import { ErrorToast } from '../../components/Utils/ErrorToast';
import SocialList from '../../components/UI/SocialList';
import ProfileBanner from '../../components/UI/ProfileBanner';
import ProfileUserData from '../../components/UI/ProfileUserData';

export default function UsersList() {
	const router = useRouter();
	const { user_id } = router.query;

	/**
	 * User data is stored in the state, as well as a loading status for it and an error object in case of failure
	 */
	const [user, setUser] = useState({});
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = () => {
		userService
			.getUserById(user_id)
			.then(({ data }) => {
				setUser(data);

				setIsLoaded(true);
			})
			.catch(err => {
				console.log(err);

				setIsLoaded(null);
				setError(err);
			});
	};

	/**
	 *  This function could be useful in case we wanted the data splited (with separated states)
	 */
	// const getUserData = () => {
	// 	const getUser = userService.getUserById(user_id);
	// 	const getPets = userService.getUserPetsById(user_id);
	// 	const getFriends = userService.getUserFriendsById(user_id);

	// 	Promise.all([getUser, getPets, getFriends])
	// 		.then(([user, pets, friends]) => {
	// 			setUser(user.data[0]);
	// 			setPets(pets.data);
	// 			setFriends(friends.data);
	// 			setIsLoaded(true);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 			setIsLoaded(null);
	// 		});
	// };

	return (
		<section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
			<ProfileBanner />

			{isLoaded !== null && (
				<>
					{isLoaded && user.length !== 0 ? <ProfileUserData user={user} /> : <Spinner />}
					<div>{isLoaded && user.length > 1 ? <SocialList user={user} /> : <Spinner />}</div>
				</>
			)}

			{error && (
				<ErrorToast error={error} closeToast={() => setError(false)}>
					<p>We are sorry!</p>
					<p>There was an error retrieving friends and pets for you</p>
				</ErrorToast>
			)}
		</section>
	);
}
