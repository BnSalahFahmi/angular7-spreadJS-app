// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Injectable()
// export class TranslateService {
//     data: any = {};
//     constructor(private http: HttpClient) {

//     }

//     setLang(lang: string) {
//         this.use(lang);
//     }

//     use(lang: string): Promise<{}> {
//         return new Promise<{}>((resolve, reject) => {
//           const langPath = `assets/i18n/${lang || 'en'}/${lang || 'en'}.json`;
//           this.http.get<{}>(langPath).subscribe(
//             translation => {
//               this.data = Object.assign({}, translation || {});
//               resolve(this.data);
//             },
//             error => {
//               this.data = {};
//               resolve(this.data);
//             }
//           );
//         });
//       }
// }