import Link from 'next/link';
import styled from 'styled-components';

const HoverLink = styled.a`
	display: block;
	width: 100%;

	&:hover,
	&:focus,
	&:active {
		background: #fdf9f7;
		border-bottom: 1px #e6e4e7;
	}
`;

export default function UserCard({ user }) {
	return (
		<Link href={`/users/${user.id}`} passHref>
			<HoverLink style={{ display: 'block', width: '100%' }}>
				<div style={{ display: 'flex', padding: 16, gap: 12, height: 124 }}>
					<div style={{ width: '26px' }}>
						<img src="/profile-icon.png" style={{ width: '26px', height: '26px', objectFit: 'cover' }} />
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							padding: '0px',
							gap: '4px',
						}}
					>
						<h2
							style={{
								margin: 0,
								padding: 0,
								color: '#A09BA3',
								fontWeight: 400,
								fontSize: 16,
							}}
						>
							{user.name}
						</h2>
						<p style={{ color: '#1B141F', fontWeight: 400, fontSize: 16, fontStyle: 'normal', margin: 0 }}>
							{user.description}
						</p>
					</div>
				</div>
			</HoverLink>
		</Link>
	);
}
