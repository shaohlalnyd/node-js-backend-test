import express, {Request, Response} from "express";
import {body, validationResult} from "express-validator";
import {CategoryCreateDto, CategoryReadDto, CategorySummeryReadDto, CategoryUpdateDto} from "../dtos/category.dto";
import CategoryService from "../services/category.service";

const router = express.Router();

router.get("/get-all", async (req: Request, res: Response, next) => {
    const categoryName: string = req.query.categoryName as string || "";
    const result: CategorySummeryReadDto[] = await CategoryService.findAll(categoryName);
    res.json(result);
});

router.get("/get-one-by-id/:id", async (req: Request, res: Response, next) => {
    try {
        const id = Number(req.params.id as string);
        const result: CategoryReadDto = await CategoryService.GetOneById(id);
        res.json(result);
    } catch (e) {
        next(e);
    }
});

router.post("/add-new",
    body("category").not().isEmpty(),
    body("counter").not().isEmpty(),
    body("latitude").not().isEmpty(),
    body("longitude").not().isEmpty(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: errors.array()});
            }
            const creatingModel: CategoryCreateDto = new CategoryCreateDto(req.body);
            const result: CategoryReadDto = await CategoryService.CreateOne(creatingModel);
            res.json(result);
        } catch (e) {
            next(e);
        }
    });

router.put("/update-one", body("category").not().isEmpty(),
    body("counter").not().isEmpty(),
    body("latitude").not().isEmpty(),
    body("longitude").not().isEmpty(),
    body("id").not().isEmpty(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({error: errors.array()});
            }
            const updatingModel: CategoryUpdateDto = new CategoryUpdateDto(req.body);
            const result: CategoryReadDto = await CategoryService.UpdateOne(updatingModel);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
);

router.delete("/remove-one/:id", async (req, res, next) => {
    const id = Number(req.params.id as string);
    try {
        const result = await CategoryService.RemoveOneById(id);
        res.json(result);
    } catch (e) {
        next(e);
    }
})

router.get("/get-pagination/:pageNumber/:pageSize", async (req, res, next) => {
    const pageNumber = Number(req.params.pageNumber as string);
    const pageSize = Number(req.params.pageSize as string);

    const categoryName: string = req.query.categoryName as string || "";

    const result: CategorySummeryReadDto[] = await CategoryService.GetPagination(pageNumber, pageSize, categoryName);
    res.json(result);

});

export default router;
