interface Imediator {
    notify(sender: Component, event: string): void;
}

class Component {
    dialog: Imediator;

    constructor(dialog: Imediator) {
        this.dialog = dialog;
    }

    click() {
        this.dialog.notify(this, "click");
    }

    keypress() {
        this.dialog.notify(this, "keypress")
    }

}

class Authentication implements Imediator {
    title: string;
    loginOrRegister: Checkbox;
    loginUsername: Textbox;
    loginPassword: Textbox;
    registrationUsername: Textbox;
    registrationPassword: Textbox;
    ok: Button;
    cancel: Button;

    constructor(title: string) {
        this.title = title;
        this.loginOrRegister = new Checkbox(this);
        this.loginUsername = new Textbox(this);
        this.loginPassword = new Textbox(this);
        this.registrationUsername = new Textbox(this);
        this.registrationPassword = new Textbox(this);
        this.ok = new Button(this);
        this.cancel = new Button(this);

    }

    notify(sender: Component, event: string) {
        if (sender instanceof Checkbox && event == "check") {
            if (this.loginOrRegister.isCheck) {
                this.title = "Log in";
                console.log("Вход");
            }
            else {
                this.title = "Register"
                console.log("Регистрация");
            }
        }
        if (sender instanceof Button && event == "click") {
            if (this.loginOrRegister.isCheck)
                console.log("Вы успешно зашли в существующий аккаунт");
            else
                console.log("Аккаунт создан. Вы авторизированы");
        }
    }
}

class Button extends Component {
    isClick: boolean;
    click() {
        this.dialog.notify(this, "click");
    }
}

class Textbox extends Component {
    someText: string;
    text() {
        this.dialog.notify(this, "text");
    }
}

class Checkbox extends Component {
    isCheck: boolean;
    check() {
        this.dialog.notify(this, "check");
    }
}

let mediator = new Authentication("Hello");
mediator.loginOrRegister.isCheck = true;
mediator.loginOrRegister.check();

mediator.ok.click();
mediator.loginOrRegister.isCheck = false;
mediator.loginOrRegister.check();