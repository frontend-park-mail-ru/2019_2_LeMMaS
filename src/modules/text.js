const ELLIPSIS = "...";

export default class Text {
    static cutIfLong(text, limit) {
        return text.slice(0, limit) + (text.length > limit ? ELLIPSIS : "");
    }
}
