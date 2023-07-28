import app from "../app";
import request from "supertest";

describe('GET /api/employees', ()=>{
    it('should respond with employees list', async()=>{
        const response = await request(app).get('/api/employees');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success', true)
        expect(response.body).toHaveProperty('message', 'Fetched all employees')
    });
});


