import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user'

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	saveLocalUser,
	getUsers,
	getById,
	remove,
	update,
	getEmptyUser
}

window.userService = userService

function getUsers() {
	return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
	const user = await storageService.get(STORAGE_KEY_USER_DB, userId)
	return user
}

function remove(userId) {
	return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(userToUpdate) {
	const user = await getById(userToUpdate.id)

	const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
	if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
	return updatedUser
}

function getEmptyUser() {
	return {
		username: '',
		fullname: '',
		password: '',
		imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
	}
}

// Auth functions

async function signup(userCred) {
	// Adding "Server data"
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	// Creating a new user
	const user = await storageService.post('user', userCred)
	// Performing login -> Saving in the session storage
	return saveLocalUser(user)
}

async function login(userCred) {
	const users = await storageService.query(STORAGE_KEY_USER_DB)
	const user = users.find(user => user.username === userCred.username)
	if (user) {
		return saveLocalUser(user)
	}
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
	user = { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123', isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123',  isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123'})
// })()