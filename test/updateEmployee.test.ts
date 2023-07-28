import app from "../app";
import request from "supertest";


describe('PATCH /api/employees/${id}', ()=>{
    it('should update the employee with the given _id', async()=>{
        const id = "64c2e98e0a320950eb39be69";
        const data = {email: "neemn@gmail.com"}
        const response = await request(app).patch(`/api/employees/${id}`).send(data);
        expect(response.status).toBe(200)
    })
})
