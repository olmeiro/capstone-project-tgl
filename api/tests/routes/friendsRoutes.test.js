const app = require("../../app")
const request = require("supertest")

describe("GET /friends from a user", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/friends/1").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response an Object", async () => {
        const response = await request(app).get("/friends/1").send()
        expect(response.body).toBeInstanceOf(Object)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).get("/friends/1").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })


})

describe("POST / add a friend",()=>{
    test("should response with a 200 status code",async ()=>{
        const response = await request(app).post("/friends").send({
            "friendId":8,
            "userId":12
        })
        expect(response.statusCode).toBe(200)
    } )

    test("should response an Object", async () => {
        const response = await request(app).post("/friends").send()
        expect(response.body).toBeInstanceOf(Object)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).post("/friends").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })

})

describe("DELETE / delete a friend", ()=>{

    test("should response with a 200 status code", async () => {
        const response = await request(app).delete("/friends?userid=7&friendid=3").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).delete("/friends?userid=7&friendid=3").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })
})