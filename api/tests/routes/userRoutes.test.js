const app = require("../../app")
const request = require("supertest")

describe("GET /user/all", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/user/all").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response an Object", async () => {
        const response = await request(app).get("/user/all").send()
        expect(response.body).toBeInstanceOf(Object)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).get("/user/all").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })


})

describe("POST /user", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).post("/user").send({
            "alias": "haciendo test con jest",
            "name": "albertoJesus",
            "bio": " amante del codigo y las largas caminatas ",
            "email": "ejemplo@ejemplo.com",
      
            "password": "jesus12345"
        })
        expect(response.statusCode).toBe(200)
    })

    test("should response an Object", async () => {
        const response = await request(app).post("/user").send()
        expect(response.body).toBeInstanceOf(Object)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).post("/user").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })

})

describe("PUT /user", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).put("/user").send({
            "idUser": 2,
            "alias": "nuevo alias",
            "name": "albert",
            "bio": "nueva bio",
            "email": "email nuevo",
            "phone": "345454"
        })
        expect(response.statusCode).toBe(200)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).put("/user").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })

})

describe("DELETE /user", ()=>{

    test("should response with a 200 status code", async () => {
        const response = await request(app).delete("/user/3").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).put("/user").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })
})