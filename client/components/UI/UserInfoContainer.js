import styled from 'styled-components';

const UserInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 4px;
`;

const UserName = styled.h2`
	margin: 0;
	padding: 0;
	color: #a09ba3;
	font-weight: 400;
	font-size: 16px;
`;

const UserDescription = styled.p`
	color: #1b141f;
	font-weight: 400;
	font-size: 16px;
	font-style: normal;
	margin: 0;
`;

export default function UserInfoContainer({ user }) {
	return (
		<UserInfoWrapper>
			<UserName>{user.name}</UserName>

			<UserDescription>{user.description}</UserDescription>
		</UserInfoWrapper>
	);
}
