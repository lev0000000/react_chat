let users = []

const addUser = (user) => {
    const isExist = findUser(user)

    !isExist && users.push(user)

    currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser}
} 

const findUser = (params) => {
    const userName = params.name.trim().toLowerCase()
    const userRoom = params.room.trim().toLowerCase()

    return users.find(u=> u.name.trim().toLowerCase()===userName && u.room.trim().toLowerCase() === userRoom)
}

const countOnlineRoom = (room) => {
    return users.filter(item=> item.room === room)
}

const delCountOnline = (user, array) => {
    return array.filter(item => item.name != user)
}

module.exports = { addUser, findUser, countOnlineRoom, delCountOnline}