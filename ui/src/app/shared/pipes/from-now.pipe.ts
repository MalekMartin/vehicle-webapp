import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/*
 * Time helper using momentjs
 * Used for formatting 'from-now' stamps
 * Usage:
 *   timestamp | fromNow
 * Momentjs docs: http://momentjs.com/docs/#/displaying/fromnow/
 */
@Pipe({name: 'fromNow'})
export class FromNowPipe implements PipeTransform {
    transform(value:string, format:string):string {
        moment.locale('cs');
        const date = moment(value,format || 'DD.MM.YYYY');
        if (date.isValid()) {
            return date.fromNow();
        } else {
            return value;
        }
    }
}
