const ELLIPSIS = "...";

class TextUtils {
    cutIfLong(text, limit) {
        return text.slice(0, limit) + (text.length > limit ? ELLIPSIS : "");
    }
}

const textUtils = new TextUtils();
export default textUtils;
