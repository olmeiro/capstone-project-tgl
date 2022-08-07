const app = require("../../app")
const request = require("supertest")

describe("GET /posts/all", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).get("/posts/all").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response an Object", async () => {
        const response = await request(app).get("/posts/all").send()
        expect(response.body).toBeInstanceOf(Object)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).get("/posts/all").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })


})

// describe("POST /posts", () => {

//     test("should response with a 200 status code", async () => {
//         const response = await request(app).post("/posts").send({
//             "loginUserId": 1,
//             "description": "albertoJesus",
//             "file":{"path": "ruta de la foto subida"},
//         })
//         expect(response.statusCode).toBe(200)
//     })

//     test("should response an Object", async () => {
//         const response = await request(app).post("/posts").send({
//             "description": "publicacion test",
//             "loginpostsId": 1
//         })
//         expect(response.body).toBeInstanceOf(Object)
//     })

//     test("should response a content-type: application/json; charset=utf-8", async () => {
//         const response = await request(app).post("/posts").send()
//         expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
//     })

// })

describe("PUT /posts", () => {

    test("should response with a 200 status code", async () => {
        const response = await request(app).put("/posts").send({
            "id": 1,
            "description": "Gaseosa KRRRR",
        })
        expect(response.statusCode).toBe(200)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).put("/posts").send()
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8")
    })

})

describe("DELETE /posts", ()=>{

    test("should response with a 200 status code", async () => {
        const response = await request(app).delete("/posts/3").send()
        expect(response.statusCode).toBe(200)
    })

    test("should response a content-type: application/json; charset=utf-8", async () => {
        const response = await request(app).delete("/posts").send()
        expect(response.headers["content-type"]).toEqual("text/html; charset=utf-8")
    })
})