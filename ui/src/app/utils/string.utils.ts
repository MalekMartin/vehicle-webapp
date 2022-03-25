import * as _ from 'lodash';

export class StringUtils {

    public static toQuery(item: any): string {
        const str = [];
        for (const p in item) {
            if (item.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item[p]));
            }
        }
        return str.join('&');
    }

    public static endsWith(text: string, suffix: string) {
        const lastIndex = text.lastIndexOf(suffix);
        return lastIndex !== -1 && lastIndex === (text.length - suffix.length);
    }

    public static cut(text: string, length: number): string {
        return _.truncate(text, {'length': length});
    }

    public static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    public static guid() {
        return StringUtils.s4() + StringUtils.s4() + '-' + StringUtils.s4() + '-' + StringUtils.s4() + '-' +
            StringUtils.s4() + '-' + StringUtils.s4() + StringUtils.s4() + StringUtils.s4();
    }

    public static trim(x): string {
        return (x || '').replace(/^\s+|\s+$/gm, '');
    }

    public static isBlank(x): boolean {
        return !this.trim(x);
    }

}
