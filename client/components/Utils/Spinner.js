import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(375deg);
  }
`;

const ShadowScreen = styled.div`
	pointer-events: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #2223;
`;

const SpinnerWrapper = styled.div`
	display: inline-block;
	position: absolute;
	top: calc(50% - 40px);
	left: calc(50% - 40px);
	width: 80px;
	height: 80px;
	z-index: 10;
	animation: ${rotate} 1.5s ease-in-out infinite;
`;

const SpinnerShadow = styled.div`
	position: absolute;
	top: calc(50% - 40px);
	left: calc(50% - 40px);
	width: 80px;
	height: 80px;
	background: #fff6;
	border-radius: 50%;
	box-shadow: 0 0 80px 80px #fff6;
`;

export const Spinner = () => (
	<ShadowScreen>
		<SpinnerWrapper>
			<img src="/logo-track.png" width="80" height="80" />
		</SpinnerWrapper>
		<SpinnerShadow />
	</ShadowScreen>
);
