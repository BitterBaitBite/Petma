import Link from 'next/link';
import styled from 'styled-components';
import UserInfoContainer from './UserInfoContainer';

const HoverLink = styled.a`
	display: block;
	width: 100%;

	&:hover,
	&:focus,
	&:active {
		background: #fdf9f7;
		border-bottom: 2px solid #e6e4e7;
	}
`;

const UserCardContainer = styled.div`
	display: flex;
	padding: 16px;
	gap: 12px;
	height: 124px;
`;

const UserIconContainer = styled.div`
	width: 26px;
`;

const UserIconImage = styled.img`
	width: 26px;
	height: 26px;
	object-fit: cover;
`;

export default function UserCard({ user }) {
	return (
		<Link href={`/users/${user.id}`} passHref>
			<HoverLink>
				<UserCardContainer>
					<UserIconContainer>
						<UserIconImage src="/profile-icon.png" />
					</UserIconContainer>

					<UserInfoContainer user={user} />
				</UserCardContainer>
			</HoverLink>
		</Link>
	);
}
