export default class BaseComponent {
    protected parent: Element;

    constructor(parent: Element) {
        this.parent = parent;
    }

    public render = () => {};
}
