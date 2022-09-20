import styled from 'styled-components';

const ProfileBannerWrapper = styled.div`
	display: block;
	position: relative;
	width: 100%;
	/* margin-bottom: 16vw; */
`;

const BannerImage = styled.img`
	width: 100%;
	height: 135px;
	object-fit: cover;
	border-radius: 10px;
`;

const ProfileImageContainer = styled.div`
	position: absolute;
	bottom: -12.5vw;
	left: calc(50vw - 12.5vw);
	width: 25%;
	height: auto;
`;

const ProfileImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

export default function ProfileBanner() {
	return (
		<ProfileBannerWrapper>
			<BannerImage src="/large.png" />

			<ProfileImageContainer>
				<ProfileImage src="/profile-icon.png" />
			</ProfileImageContainer>
		</ProfileBannerWrapper>
	);
}
