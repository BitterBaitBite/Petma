import axios from 'axios';

class UserService {
	constructor() {
		this.app = axios.create({
			baseURL: `${process.env.NEXT_PUBLIC_REST_API_URI}/users`,
			withCredentials: true,
		});
	}

	getAllUsers = () => this.app.get(`/`);
	getUserById = user_id => this.app.get(`/${user_id}`);
	getUserPetsById = user_id => this.app.get(`/${user_id}/pets`);
	getUserFriendsById = user_id => this.app.get(`/${user_id}/friends`);
	createUser = body => this.app.post('/', body);
	updateUser = (user_id, body) => this.app.put(`/${user_id}`, body);
	deleteUser = user_id => this.app.delete(`/${user_id}`);
}

const userService = new UserService();

export default userService;
