
class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

const users = [new User(1, 'john', 'password')];

module.exports = {
    User,
    users
};