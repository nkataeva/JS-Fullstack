var Car = /** @class */ (function () {
    function Car(wheels, body, type) {
        this._wheels = wheels;
        this._body = body;
        this._motor = type;
    }
    Car.prototype.getColor = function () {
        return this._wheels;
    };
    Car.prototype.setColor = function (wheels) {
        this._wheels = wheels;
    };
    Car.prototype.getModel = function () {
        return this._body;
    };
    Car.prototype.setModel = function (body) {
        this._body = body;
    };
    Car.prototype.getType = function () {
        return this._motor;
    };
    Car.prototype.setType = function (type) {
        this._motor = type;
    };
    return Car;
}());
var SportCarBuilder = /** @class */ (function () {
    function SportCarBuilder() {
    }
    SportCarBuilder.prototype.makingBody = function () {
        this._body = 'Sporty elongated body';
        return this;
    };
    SportCarBuilder.prototype.makingMotor = function () {
        this._motor = 'Sporty powerful motor';
        return this;
    };
    SportCarBuilder.prototype.makingWheels = function () {
        this._wheels = 'Sporty wheels';
        return this;
    };
    SportCarBuilder.prototype.build = function () {
        var car = new Car(this._wheels, this._body, this._motor);
        return car;
    };
    return SportCarBuilder;
}());
var ModernCarBuilder = /** @class */ (function () {
    function ModernCarBuilder() {
    }
    ModernCarBuilder.prototype.makingBody = function () {
        this._body = 'Modern model';
        return this;
    };
    ModernCarBuilder.prototype.makingMotor = function () {
        this._motor = 'Ordinary motor';
        return this;
    };
    ModernCarBuilder.prototype.makingWheels = function () {
        this._wheels = 'Modern wheels';
        return this;
    };
    ModernCarBuilder.prototype.build = function () {
        var car = new Car(this._wheels, this._body, this._motor);
        return car;
    };
    return ModernCarBuilder;
}());
var Engineer = /** @class */ (function () {
    function Engineer(builder) {
        this._builder = builder;
    }
    Engineer.prototype.assembling = function () {
        return this._builder.makingMotor().makingBody().makingWheels().build();
    };
    return Engineer;
}());
var builder = new ModernCarBuilder();
var engineer = new Engineer(builder);
var car = engineer.assembling();
console.log(car);
