export default class BaseComponent {
    protected parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }

    public render = () => {};
}
