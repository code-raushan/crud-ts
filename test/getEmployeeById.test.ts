import app from "../app";
import request from "supertest";

describe('GET /api/employees/:id', ()=>{
    it('should return employee details if _id found', async()=>{
        const id = "64c26e8135e615eaf360a1a9";
        const data = {
            "__v": 0,
            "_id": "64c26e8135e615eaf360a1a9",
            "createdAt": "2023-07-27T13:17:53.159Z",
            "department": "Tech",
            "email": "raushan@gahoo.com",
            "firstName": "Raushan",
            "updatedAt": "2023-07-27T15:50:33.512Z",
            "lastName": "Kumar",
          }
        const response = await request(app).get(`/api/employees/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data', data)
    });
});