import Link from 'next/link';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
	display: flex;
	justify-content: center;
	align-content: center;
	height: 80px;
`;

const LogoLink = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function Header() {
	return (
		<HeaderWrapper>
			<Link href="/" passHref>
				<LogoLink>
					<img src="/logo-petma.png" alt="Petma Logo" width="20%" height="auto" />
				</LogoLink>
			</Link>
		</HeaderWrapper>
	);
}
