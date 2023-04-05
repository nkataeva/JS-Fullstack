class Car {
    private _wheels: string;
    private _body: string;
    private _motor: string;

    constructor(wheels: string, body: string, type: string) {
        this._wheels = wheels;
        this._body = body;
        this._motor = type;
    }

    getColor(): string {
        return this._wheels;
    }

    setColor(wheels: string): void {
        this._wheels = wheels;
    }

    getModel(): string {
        return this._body;
    }

    setModel(body: string): void {
        this._body = body;
    }

    getType(): string {
        return this._motor;
    }

    setType(type: string): void {
        this._motor = type;
    }

}

interface CarBuilder {
    makingBody(): CarBuilder;
    makingMotor(): CarBuilder;
    makingWheels(): CarBuilder;
    build(): Car;
}

class SportCarBuilder implements CarBuilder{
    private _wheels: string;
    private _body: string;
    private _motor: string;

    makingBody(): CarBuilder {
        this._body = 'Sporty elongated body';
        return this;
    }
    makingMotor(): CarBuilder {
        this._motor = 'Sporty powerful motor';
        return this;
    }
    makingWheels(): CarBuilder {
         this._wheels = 'Sporty wheels';
         return this;
    }
    build(): Car {
        let car = new Car(this._wheels, this._body, this._motor);
        return car;
    }
}

class ModernCarBuilder implements CarBuilder{
    private _wheels: string;
    private _body: string;
    private _motor: string;

    makingBody(): CarBuilder {
        this._body = 'Modern model';
        return this;
    }
    makingMotor(): CarBuilder {
        this._motor = 'Ordinary motor';
        return this;
    }
    makingWheels(): CarBuilder {
         this._wheels = 'Modern wheels';
         return this
    }
    build(): Car {
        let car = new Car(this._wheels, this._body, this._motor);
        return car;
    }
}

class Engineer {
    private _builder: CarBuilder;

    constructor(builder: CarBuilder) {
        this._builder = builder;
    }

    assembling() {
        return this._builder.makingMotor().makingBody().makingWheels().build();
    }
}

let builder: CarBuilder = new ModernCarBuilder();
let engineer: Engineer = new Engineer(builder);
let car: Car = engineer.assembling();
console.log(car);