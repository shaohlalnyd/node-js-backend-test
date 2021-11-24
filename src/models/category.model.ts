import {CategoryCreateDto, CategoryUpdateDto} from "../dtos/category.dto";

export class Category {
    public latitude: number;
    public longitude: number;
    public category: string;
    public counter: number;
    public id: number;

    constructor(input?: Category | CategoryCreateDto | CategoryUpdateDto) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        if (!(input instanceof CategoryCreateDto)) {
            this.id = input.id || 0;
        }
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
}
