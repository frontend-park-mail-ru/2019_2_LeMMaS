export default class BaseComponent {
    protected parent: HTMLElement;
    public render: () => unknown;

    constructor(parent: HTMLElement) {
        this.parent = parent;
    }
}
