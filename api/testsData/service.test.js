const getAllUsersStub = async () => Promise.resolve([
    {
        "id": 1,
        "alias": "alias1",
        "name": "name1",
        "bio": "bio1",
        "status": "status1",
        "email": "email1",
        "phone": "phone1",
        "friends": "friends1",
        "favorites": "favorites1"
    }   
])

module.exports = { getAllUsersStub }