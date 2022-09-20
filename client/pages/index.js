import Head from 'next/head';
import Image from 'next/image';
import UsersList from '../components/UI/UsersList';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			{/* <div className={styles.container}> */}
			<Head>
				<title>Petma</title>
				<meta name="description" content="Social network for animal lovers" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<UsersList />
		</>
	);
}
