export class ConfirmDialogServiceStub {
    get dialog() { return this; }
    title(title) { return this; }
    message(title) { return this; }
    ok(title: string) { return this; }
    cancel(title: string) { return this; }
    subscribe(cb: (value: boolean) => void) { return cb(true); }
    observable() { return this; }
    take() { return this; }
}
