import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customPipe',
    standalone: true,
})
export class customPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}

    transform(date: string) {
        const targetDate = new Date(date);
        const todayDate = new Date();
        if (this.datePipe.transform(targetDate, 'dd/MM/yyyy') === this.datePipe.transform(todayDate, 'dd/MM/yyyy')) {
            if (this.datePipe.transform(targetDate, 'hh') === this.datePipe.transform(todayDate, 'hh')) {
                if (this.datePipe.transform(targetDate, 'mm') === this.datePipe.transform(todayDate, 'mm')) {
                    const today = this.datePipe.transform(todayDate, 'ss');
                    const target = this.datePipe.transform(targetDate, 'ss');
                    const seconds = Math.abs(+today! - +target!);
                    return seconds + ' seconds ago';
                } else {
                    const today = this.datePipe.transform(todayDate, 'mm');
                    const target = this.datePipe.transform(targetDate, 'mm');
                    const minutes = Math.abs(+today! - +target!);
                    if (minutes == 1) {
                        return '1 minute ago';
                    } else {
                        return minutes + ' minutes ago';
                    }
                }
            } else {
                const today = this.datePipe.transform(todayDate, 'hh');
                const target = this.datePipe.transform(targetDate, 'hh');
                const hours = Math.abs(+today! - +target!);
                if (hours === 1) {
                    return '1 hour ago';
                } else {
                    return hours + ' hours ago';
                }
            }
        } else {
            const days = Math.floor((Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()) - Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())) / (1000 * 60 * 60 * 24));
            if (days === 1) {
                return '1 day ago';
            } else if (days <= 30) {
                return days + ' days ago';
            } else {
                const months = Math.floor(days / 30);
                if (months === 1) {
                    return months + 'month ago';
                } else {
                    return months + 'months ago';
                }
            }
        }
    }
}
