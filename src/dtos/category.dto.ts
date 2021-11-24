export class CategoryReadDto {
    public latitude?: number;
    public longitude?: number;
    public category: string;
    public counter?: number;
    public id: number;

    constructor(input?: CategoryReadDto) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        this.id = input.id || 0;
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
}

export class CategorySummeryReadDto {
    public id: number;
    public category: string;

    constructor(input?: CategorySummeryReadDto) {
        this.category = input.category || "";
        this.id = input.id || 0;
    }
}

export class CategoryCreateDto {
    public category: string;
    public counter: number;
    public latitude: number;
    public longitude: number;

    constructor(input?: CategoryCreateDto | CategoryUpdateDto) {
        this.category = input.category || "";
        this.counter = input.counter || 0;
        this.latitude = input.latitude || 0;
        this.longitude = input.longitude || 0;
    }
}

export class CategoryUpdateDto extends CategoryCreateDto {
    public id: number;

    constructor(input?: CategoryUpdateDto) {
        super(input);
        this.id = input.id || 0;
    }
}
