import bodyParser from "body-parser";
import express from "express";
import request from "supertest";
import categoryRouter from "../controllers/category.controller";
import {CategoryCreateDto} from "../dtos/category.dto";

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/category", categoryRouter);

test("responds to /", async () => {
    const res = await request(app).get("/category/get-all");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
});

test("get-one-category-by-id-test-if-categories-exists-and-category-founded", async () => {
    const categoriesRes = await request(app).get("/category/get-all");
    const categories = categoriesRes.body;
    const id = categories[0].id;
    const res = await request(app).get(`/category/get-one-by-id/${id}`);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
});

test("get one category by id test if categories exists and category not founded", async () => {
    const id = 1000;
    const res = await request(app).get(`/category/get-one-by-id/${id}`);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(404);
});

test("add new category if not exists", async () => {
    const creatingCategory = new CategoryCreateDto({
        category: Math.random().toString(36).slice(2),
        longitude: 1,
        latitude: 1,
        counter: 1,
    });
    const res = await request(app).post(`/category/add-new`)
        .set("Content-Type", "application/json")
        .send(creatingCategory);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    await request(app).delete(`/category/remove-one/${res.body.id}`);
});

test("add new category if  exists", async () => {

    const creatingCategory = new CategoryCreateDto({
        category: Math.random().toString(36).slice(2),
        longitude: 1,
        latitude: 1,
        counter: 1,
    });
    const creatingRes = await request(app).post(`/category/add-new`)
        .set("Content-Type", "application/json")
        .send(creatingCategory);

    const res = await request(app).post(`/category/add-new`)
        .set("Content-Type", "application/json")
        .send(creatingRes.body);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(403);
    await request(app).delete(`/category/remove-one/${creatingRes.body.id}`);
});

test("update category if correct", async () => {
    const creatingCategory = new CategoryCreateDto({
        category: Math.random().toString(36).slice(2),
        longitude: 1,
        latitude: 1,
        counter: 1,
    });
    const creatingRes = await request(app).post(`/category/add-new`)
        .set("Content-Type", "application/json")
        .send(creatingCategory);

    const res = await request(app).put(`/category/update-one`)
        .set("Content-Type", "application/json")
        .send(creatingRes.body);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    await request(app).delete(`/category/remove-one/${creatingRes.body.id}`);
});

test("update category if exists", async () => {
    const categoriesRes = await request(app).get("/category/get-all");
    const categories = categoriesRes.body;
    const id = categories[0].id;
    const oneCategory = await request(app).get(`/category/get-one-by-id/${id}`);

    const creatingCategory = new CategoryCreateDto({
        category: Math.random().toString(36).slice(2),
        longitude: 1,
        latitude: 1,
        counter: 1,
    });
    const creatingRes = await request(app).post(`/category/add-new`)
        .set("Content-Type", "application/json")
        .send(creatingCategory);

    const categoryCreated = creatingRes.body;
    categoryCreated.category = oneCategory.body.category;


    const res = await request(app).put(`/category/update-one`)
        .set("Content-Type", "application/json")
        .send(categoryCreated);
    expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
    expect(res.statusCode).toBe(403);
    await request(app).delete(`/category/remove-one/${creatingRes.body.id}`);
});
