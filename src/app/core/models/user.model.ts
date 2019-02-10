export class User {
    fname: string;
    lname: string;
    role: string;
    login: string;
    email: string;
 
   constructor($fname: string, $lname: string, $role: string, $login: string, $email: string) {
         this.fname = $fname;
         this.lname = $lname;
         this.role = $role;
         this.login = $login;
         this.email = $email;
     }
 }