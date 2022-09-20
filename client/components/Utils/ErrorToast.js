import styled from 'styled-components';

const ShadowScreen = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: #2223;

	transition: all 3s ease-in-out;
`;

const ErrorToastContainer = styled.div`
	position: absolute;
	top: 40vh;
	left: calc(50vw - 30vw);

	width: 60vw;
	height: auto;

	padding: 10px 20px;
	border: 3px solid #fff;
	border-radius: 10px;
	background: #fcda79;
	text-align: center;

	color: #222;
`;

const ErrorCode = styled.p`
	margin: 0;
	text-align: right;
	font-size: 0.6em;
	color: #2228;
`;

export const ErrorToast = ({ children, error, closeToast }) => {
	return (
		<ShadowScreen onClick={closeToast}>
			<ErrorToastContainer>
				<div>{children}</div>

				<ErrorCode>{`${error.code} : ${error.response.status}`}</ErrorCode>
			</ErrorToastContainer>
		</ShadowScreen>
	);
};
