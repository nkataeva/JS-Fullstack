var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = /** @class */ (function () {
    function Component(dialog) {
        this.dialog = dialog;
    }
    Component.prototype.click = function () {
        this.dialog.notify(this, "click");
    };
    Component.prototype.keypress = function () {
        this.dialog.notify(this, "keypress");
    };
    return Component;
}());
var Authentication = /** @class */ (function () {
    function Authentication(title) {
        this.title = title;
        this.loginOrRegister = new Checkbox(this);
        this.loginUsername = new Textbox(this);
        this.loginPassword = new Textbox(this);
        this.registrationUsername = new Textbox(this);
        this.registrationPassword = new Textbox(this);
        this.ok = new Button(this);
        this.cancel = new Button(this);
    }
    Authentication.prototype.notify = function (sender, event) {
        if (sender instanceof Checkbox && event == "check") {
            console.log("fuck");
            if (this.loginOrRegister.isCheck) {
                this.title = "Log in";
                console.log("Вход");
            }
            else {
                this.title = "Register";
                console.log("Регистрация");
            }
        }
        if (sender instanceof Button && event == "click") {
            if (this.loginOrRegister.isCheck)
                console.log("Вы успешно зашли в существующий аккаунт");
            else
                console.log("Аккаунт создан. Вы авторизированы");
        }
    };
    return Authentication;
}());
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.click = function () {
        this.dialog.notify(this, "click");
    };
    return Button;
}(Component));
var Textbox = /** @class */ (function (_super) {
    __extends(Textbox, _super);
    function Textbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Textbox.prototype.text = function () {
        this.dialog.notify(this, "text");
    };
    return Textbox;
}(Component));
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checkbox.prototype.check = function () {
        this.dialog.notify(this, "check");
    };
    return Checkbox;
}(Component));
var mediator = new Authentication("Hello");
mediator.loginOrRegister.isCheck = true;
mediator.loginOrRegister.check();
mediator.ok.click();
mediator.loginOrRegister.isCheck = false;
mediator.loginOrRegister.check();
