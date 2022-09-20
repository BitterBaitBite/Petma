import styled from 'styled-components';

const SocialCard = styled.div`
	width: 100vw;
	height: 77px;

	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	padding: 16px;
`;

const SocialCardIconContainer = styled.div`
	width: 10vw;
	height: 100%;
	margin-right: 16px;
`;

const SocialCardIcon = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const SocialCardName = styled.p`
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 21px;
`;

export default function SocialList({ user }) {
	return user.map((el, i) => {
		if (i === 0) {
			return <></>;
		}

		return (
			<SocialCard key={i}>
				<SocialCardIconContainer>
					<SocialCardIcon src="/profile-icon.png" alt="Profile Image" />
				</SocialCardIconContainer>

				<SocialCardName>{el.name}</SocialCardName>
			</SocialCard>
		);
	});
}
