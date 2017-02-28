[{
	id: '/#1231412',
	name:'Vas',
	room:'The Office fans'
}]

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// var users = [];

// var addUser = (id,name,room) => {
// 	users.push({})
// }

// modules.export = {addUsers}

// ES6 classes

// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}

// 	getUserDescription(){
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }

// var me = new Person('Osvaldas', 25);
// var description = me.getUserDescription();
// console.log(description);

class Users {
	constructor() {
		this.users = [];
	}

	addUser(id,name,room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		var user = this.getUser(id);

		if(user) {
			// user.id !==id tas pats kas return user.id !== id
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}

	getUser(id) {
		return this.users.filter((user) => user.id === id)[0];
	}

	getUserList(room){
		var users = this.users.filter((user) => {
			return user.room === room
		});
		var namesArray = users.map((user) => {
			return user.name
		});

		return namesArray;
	}
}

module.exports = {Users};






