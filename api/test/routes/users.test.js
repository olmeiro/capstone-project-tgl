const test = require("ava");
const request = require("supertest");
const sandbox = require("sinon").createSandbox()
const proxyquire = require("proxyquire")

let app = require("../../app");
const UserService = require("../../src/services/userService");
const { getAllUsersStub } = require("../../testsData/service.test")

let server = null
let serviceStub = null

test.beforeEach(async () => {
    serviceStub = sandbox.stub(UserService.prototype, 'getAllUsers').callsFake(() => getAllUsersStub)

    const dataService = proxyquire("../../src/routes/userRouter", {
        "../services/userService": serviceStub  // ruta de servicios 
    })

    app = proxyquire("../../app", {
        "./src/routes/index": dataService // ruta de usuarios peticiones
    })

    server = await request(app)
})

test.afterEach(() => {
    sandbox.restore()
})

test.serial("/user/all", async t => {
    const response = server.get("/user/all")
    t.is(response.statusCode, 200)
    t.is(response.headers["content-type"], "application/json; charset=utf-8")
    t.pass()
})