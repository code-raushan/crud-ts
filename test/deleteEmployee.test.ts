import app from "../app";
import request from "supertest";


describe('DELETE /api/employees/${id}', ()=>{
    it('should delete employee from db by _id', async()=>{
        const id = "64c2d2afdbd8ea86ab1ce253";
        const response = await request(app).delete(`/api/employees/${id}`);
        expect(response.status).toBe(200)
    });
});
