export class NonExistentLink extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NonExistentLink";
    }
}

export class InvalidValue extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidValue";
    }
}

export class ExistingValue extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Existingelement";
    }
}