import HttpMethod from "./index";

class authServices {
	loginUser = ({ email, password }) => {
		const userData = {
			email,
			password,
		};
		return HttpMethod.post("/login", userData);
	};

	signUpUser = ({ email, password, confirmPassword, handle }) => {
		const newUserData = {
			email,
			password,
			confirmPassword,
			handle,
		};
		return HttpMethod.post(`/signup`, newUserData);
	};

	logoutUser = () => {
		localStorage.removeItem("token");
		return HttpMethod.deleteTokenHeader();
	};

	getUser = () => {
		return HttpMethod.get(`/user`).then((res) => res.data);
	};

	uploadUserImage = (formData) => {
		return HttpMethod.post("/user/image", formData).then((res) => res.data);
	};

	editUser = (userEditData) => {
		return HttpMethod.post("/user", userEditData);
	};

	getUserByUserHandle = (userHandle) => {
		return HttpMethod.get(`/user/${userHandle}`).then((res) => res.data);
	};

	markNotificationRead = (notificationId) => {
		return HttpMethod.post("/notifications", notificationId).then((res) => res.data);
	};

	saveToLocalStorage = (token) => {
		if (token && typeof token === "string") {
			localStorage.setItem("token", token);
		}
	};

	deleteToLocalStorage = () => {
		localStorage.removeItem("token");
	};

	attachTokenToHeader = (token) => {
		if (token && typeof token === "string") {
			HttpMethod.attachTokenToHeader(token);
		}
	};
}

export default new authServices();
