import app from "../app";
import request from "supertest";

describe('POST /api/create', ()=>{
    it('should create an employee in the db', async()=>{
        const empData = {firstName: "Test", lastName: "User", email: "test@test.com", department:"Testing"};
        const response = await request(app).post('/api/create').send(empData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Employee created successfully')
    });
    it('should handle incomplete data', async()=>{
        const incompleteData = {firstName: "Test",department:"Testing"};
        const response = await request(app).post('/api/create').send(incompleteData);
        expect(response.status).toBe(401);
    });
});
