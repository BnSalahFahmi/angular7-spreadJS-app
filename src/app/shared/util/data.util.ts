
export default class DateTimeUtil {
    static convertFromDatePicker(datePicker: any) {

        // let date = new Date(datePicker.year, datePicker.month - 1, datePicker.day);
        let date = new Date(Date.UTC(datePicker.year,datePicker.month - 1 ,datePicker.day ,0,0,0,0));
        // let date = new Date(0)

        console.log("DATE",date.getTime(),date)
        return date;
    }

    static convertToDatePicker(date: Date) {
      console.log("IPUT DATE",date)
        const datePick = { 'year': 0, 'month': 0, 'day': 0 };
        datePick.year = date.getUTCFullYear();
        datePick.month = date.getUTCMonth() + 1;
        datePick.day = date.getUTCDate();
        return datePick;
    }

    static formatYearMonth(date: Date) {
        var options = {
            month: 'long',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-GB', options);
    }

    static getLastDate(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    static getUTCMonthName(date: Date):string
    {
      return monthNames[date.getUTCMonth()]
    }
}

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];

