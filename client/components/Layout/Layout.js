import Link from 'next/link';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
	font-size: 16px;
`;

const LogoLink = styled.a`
	display: flex;
	justify-content: center;
	align-content: center;
`;

export default function Layout({ children }) {
	return (
		<>
			<Header>
				<Link href="/" passHref>
					<LogoLink>
						<img src="/logo-petma.png" alt="Petma Logo" width="20%" height="auto" />
					</LogoLink>
				</Link>
			</Header>

			<Main>{children}</Main>
		</>
	);
}
