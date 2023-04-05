interface Icar { 
    drive(age: number): void;
}

class Driver {
    age: number;
    constructor(age: number) {
        this.age = age
    }
}

class Car implements Icar{
    drive() {
        console.log('Можете водить машину')
    }
}

class ProxyCar implements Icar {
    driver: Driver;
    car: Car;
    constructor(driver: Driver) {
        this.car = new Car()
        this.driver = driver
    }

    drive() {
        if (this.driver.age < 18) {
            console.log('Соре, вы не можете водить машину')
        } else {
            this.car.drive()
        }
    }
}


let driver1 = new Driver(17.5)
let car1 = new ProxyCar(driver1)
car1.drive()

let driver2 = new Driver(25)
let car2 = new ProxyCar(driver2)
car2.drive()