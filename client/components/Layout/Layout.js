import Link from 'next/link';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
	font-size: 16px;
`;

export default function Layout({ children }) {
	return (
		<>
			<Header />

			<Main>{children}</Main>
		</>
	);
}
