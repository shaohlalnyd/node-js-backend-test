import {PrismaClient} from "@prisma/client";
import {CategoryCreateDto, CategoryReadDto, CategorySummeryReadDto, CategoryUpdateDto} from "../dtos/category.dto";
import {ErrorHandler} from "../middlewares/error-middleware";
import {Category} from "../models/category.model";

const prisma = new PrismaClient();
const categoryRepository = prisma.category;

class CategoryService {
    public async findAll(categoryName: string) {
        const categories: Category[] = await categoryRepository.findMany(
            {
                where: {
                    category: {
                        contains: categoryName,
                    },
                },
            },
        );

        return categories.map((value) => {
            return new CategorySummeryReadDto(value);
        });
    }

    public async GetOneById(id: number) {
        const category: Category = await categoryRepository.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            throw new ErrorHandler(404, "category not found");
        }

        return new CategoryReadDto(category);

    }

    public async CreateOne(input: CategoryCreateDto) {

        const exitingCategory = await this.GetOneCategoryName(input.category);

        if (exitingCategory) {
            throw new ErrorHandler(403, "category already exists");
        }

        const creatingCategory = new Category(input);

        const user = await categoryRepository.create({
            data: creatingCategory,
        });

        return new CategoryReadDto(user);
    }

    public async UpdateOne(input: CategoryUpdateDto) {

        let category: Category = await categoryRepository.findUnique({
            where: {
                id: input.id,
            },
        });

        if (!category) {
            throw new ErrorHandler(404, "category not found");
        }

        const categoryWithSameName = await this.GetOneCategoryName(input.category);

        if (categoryWithSameName && categoryWithSameName.id !== input.id) {
            throw new ErrorHandler(403, "already exists a category with same name");
        }

        category = new Category(input);

        category = await categoryRepository.update({
            data: category,
            where: {
                id: input.id,
            },
        });

        return new CategoryReadDto(category);
    }

    public async RemoveOneById(id: number) {

        await this.GetOneById(id);

        const removingCategory = await categoryRepository.delete({
            where: {
                id,
            },
        });

        return new CategoryReadDto(removingCategory);
    }

    public async GetPagination(pageNumber: number, pageSize: number, categoryName: string) {
        const categories: CategorySummeryReadDto[] = await categoryRepository.findMany({
            select: {
                category: true,
                id: true,
            },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            where: {
                category: {
                    contains: categoryName,
                },
            },
        });

        return categories;
    }

    private async GetOneCategoryName(name: string) {
        const category: Category = await categoryRepository.findFirst({
            where: {
                category: name,
            },
        });
        return category;
    }
}

export default new CategoryService();
