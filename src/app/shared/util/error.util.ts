export default class ErrorUtil {
    static display(error: any) {
        console.log(error);
        if(error.status === 417)
            alert(error.error);
    }
}
