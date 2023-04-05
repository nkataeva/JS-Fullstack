var Driver = /** @class */ (function () {
    function Driver(age) {
        this.age = age;
    }
    return Driver;
}());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log('Можете водить машину');
    };
    return Car;
}());
var ProxyCar = /** @class */ (function () {
    function ProxyCar(driver) {
        this.car = new Car();
        this.driver = driver;
    }
    ProxyCar.prototype.drive = function () {
        if (this.driver.age < 18) {
            console.log('Соре, вы не можете водить машину');
        }
        else {
            this.car.drive();
        }
    };
    return ProxyCar;
}());
var driver1 = new Driver(17.5);
var car1 = new ProxyCar(driver1);
car1.drive();
var driver2 = new Driver(25);
var car2 = new ProxyCar(driver2);
car2.drive();
