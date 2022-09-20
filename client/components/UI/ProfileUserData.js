import styled from 'styled-components';

const ProfileUserDataWrapper = styled.div`
	margin: 16vw 0 6vw;
`;

const UserDataContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #2d1937;
	padding: 0px 16px;
	gap: 24px;
`;

const UserName = styled.h1`
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 140%;

	text-align: center;
	letter-spacing: 0.01em;
	margin: 0;
`;

const UserDescription = styled.p`
	width: 379px;
	height: 66px;

	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	margin: 0;
`;

export default function ProfileUserData({ user }) {
	return (
		<ProfileUserDataWrapper>
			<UserDataContainer>
				<UserName>{user[0].name}</UserName>
				<UserDescription>{user[0].description}</UserDescription>
			</UserDataContainer>
		</ProfileUserDataWrapper>
	);
}
