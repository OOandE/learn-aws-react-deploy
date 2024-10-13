import api from "./api";

class AuthService {
    login(user) {
        return api
            .post("auth/signin", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    signup(user) {
        return api
            .post("auth/signup", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    logout() {
        return api
            .post("auth/signout")
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    forgetPassword(user) {
        return api
            .post("auth/notify/password/reset", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    verifyEmail(user) {
        return api
            .post("auth/verify/account", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    resendEmailVerify(user) {
        return api
            .post("auth/verify/email", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    resetPassword(user) {
        return api
            .put("auth/password/reset", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }

    changePassword(user) {
        return api
            .put("auth/password/update", { ...user })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                throw error;
            });
    }
}

export default new AuthService();
