import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
    })
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const { url, method, headers, body } = request;
        
        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            
            switch (true) {
                case url.includes('login') && method === 'POST':
                    return authenticate();
                case url.endsWith('/user/informationUser') && method === 'GET':
                    return informationUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        function authenticate() {
         
            return ok({
                success: true,
                idUser: 15183,
                message: "Success! you are logged in successfully",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGRmMmJhODUzNjEwYTk2MmExZWNmYjI5YWIyZTUyOTY4NzI2NTI2MmMyNmQ3MjY5MzI1Y2U5ODEyMWZkYWIzNjE1ODFmOGI3ZDZkNDcyMmMiLCJpYXQiOjE2MjEyNzA0NzIsIm5iZiI6MTYyMTI3MDQ3MiwiZXhwIjoxNjUyODA2NDcyLCJzdWIiOiIxNTE4MyIsInNjb3BlcyI6W119.flXERBucYoy2Rywip-eZ7SV91Mc9laXGoS2wiIbbTSH7cC8cHvJKIGuHnrSXQdc0ZZzvnEaLUTIRwkIbPPStFhiZFsCBY88ji5qFGicyQu2xs5095QONUTeip-TWPDe4eSLrW4-5AKkDGwfR2-DhTUbkQeNxiviW77vu-pxv1vZM7ogzfs1NzD2Z-a6Ejp96sd1pz_ILheT7Z03jZj45ZAXdB5CsgD6FIqiN0U7bxv6xwjqHtM1iWzQSk-79aRQua6WPn3IqhafulN1fCsSNqF3pJIHAKSBKOjdAH-r5MOohjaPvmnsOojj1wE8EjG7WJZLaadsInt1prp-zGiOGyMoHNmTK75V_30Xm7sG019EBuzBTqn5jwu9v5AjGVuruYzaqwpqyTT3zSzjektR5SJMNBuO8-2t9m2wwwKSSDEGmu75lMRsc9rM7JErA931h27CI0k4jAIXbCUODVSwGzBcQleaS45cRY0GHxpI65c3qtetNFotR9Q_TWdQpp0PcCAMHO1D3hzQgJue_awpzYqdKwT3MteL4IH_zcsgP6XfYIsKOznku2UfY1UO4ZpUlnE_ZbXSB5-_WIySBzEj9nsnDw5WNooJH5iz9vxzNjOeSdgvC9ZopfWPnWJDoSjl0fjYS4ZZyWqxRofOTmjPC_u7uz4AbWZZTT_SE1u1MUQM",
                roles: [
                    "patient",
                    "staff",
                    "superadmin"
                ],
                firebaseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15cnc1aUBjb3ZpZC0zOWI5Ni5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXlydzVpQGNvdmlkLTM5Yjk2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxNTE4MyIsImlhdCI6MTYyMTI3MDQ3MiwiZXhwIjoxNjIxMjc0MDcyfQ.NqEtC0WbUdKdBYvw29FoGVQRwy765fMfsFeLRZsfXWJ85mUb0467cXFsglpiFx0b0gzkjS4hVGmJAHwmQZyCsiBzUiUZiiuLpWo2w3BgBpqVMWoG2cjmx-_V7MNLtYoeCKpN8Yi6cYdHVEf_qSxyMbOga5jUnR4RozL4oF_o26PKhdJkBEN2bl98epdB4so9drY8NtWdVCdZCyaZA3KB65y-mwu02lawA6v_JVELVRmtV-GrRX8d8gDvo2tOusGkVqEipN9IFtnAGX4heIoD_g1ySpeLPFMjrDwU8KxD5I6z487gA7U58tvCZrw9QhsRsDRQs7dsMUMptV5AR8xWtw",
                familyUnit: []
            })
        }

        function informationUser() {
            return ok({
                username: 'David Valarezo León',
                idUser: 15183,
                image: '',
                agenda: [
                    {
                        id: 668,
                        title: 'Dermatología',
                        doctor: 'Dr. Ricardo Sánchez',
                        description: null,
                        start_time: "11:00",
                        start_date: "31/05/2021 11:00",
                        end_date: "31/05/2021 11:15",
                        start_date_iso8601: "2021-05-31T11:00:00+02:00",
                        hide: false
                    },
                    {
                        id: 669,
                        title: 'Cardiología',
                        doctor: 'Dra. Viviana Molina',
                        description: null,
                        start_date: "30/06/2021 09:00",
                        end_date: "30/06/2021 09:00",
                        start_date_iso8601: "2021-06-30T09:00:00+02:00",
                        hide: false
                    },
                    {
                        id: 889,
                        title: 'Pediatría',
                        doctor: 'Dr. Antonio Castellanos Mejía',
                        description: null,
                        start_date: "20/09/2021 12:00",
                        end_date: "20/09/2021 12:00",
                        start_date_iso8601: "2021-09-20T12:00:00+02:00",
                        hide: false
                    }
                    
                ],
                advices: [
                    {
                        name: "Vídeo - Què és el coronavirus/ Qué es el coronavirus?",
                        id: 1,
                        image: 'https://www.emaratalyoum.com/polopoly_fs/1.1438180.1610014833!/image/image.jpg',
                        description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                    },
                    {
                        name: "Aïllament / Aislamiento domiciliario",
                        id: 2,
                        image: 'https://eleconomista.com.ar/wp-content/uploads/2020/05/coronavirus-vaccine-bottles-1024x576.jpg',
                        description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                    },
                    {
                        name: "Vídeo - Per què hi ha tantes mesures de contenció front al coronavirus",
                        id: 3,
                        image: null,
                        description: 'Plazo para reserva tu cita online abierto. Este año #yomevacuno'
                    }
                ],
                diets: [
                    {
                        name: "Almuerzo",
                        id: 1,
                        hour: '12:00',
                        start_date: "30/06/2021 09:00",
                        image: null,
                        description: "Yogurt desnatado con semillas de linaza"
                    },
                    {
                        name: "Cena",
                        id: 2,
                        hour: '18:00',
                        start_date: "30/06/2021 09:00",
                        image: null,
                        description: "Rollitos de queso"
                    },
                    {
                        name: "Merienda",
                        id: 3,
                        hour: '21:00',
                        start_date: "30/06/2021 09:00",
                        image: null,
                        description: "Jamón de pavo, Rollitos de queso"
                    }
                ],
                drugs: [
                    {
                        id: 1,
                        name:  "prueba ibuprofeno",
                        date_intake: "2021-05-17 12:00:00",
                        hour_intake: "12:00",
                    },
                    {
                        id: 2,
                        name: "Cefazolina",
                        date_intake: "2021-05-17 12:30:00",
                        hour_intake: "12:30",
                    },
                    {
                        id: 3,
                        name: "Cefuroxima Apotex",
                        date_intake: "2021-05-17 18:00:00",
                        hour_intake: "18:00",
                    }
                ],
                games: [
                    {
                        name: "Epidemia The Game",
                        id: 4,
                    },
                    {
                        name: "Epidemia The Game II",
                        id: 46,
                    },
                ],
                goals: [
                    {
                        id: 66,
                        name: 'Peso',
                        description: "Continua realizando los retos para bajar de peso",
                        min: 0,
                        max: 10,
                        steps: 6,
                    },
                    {
                        id: 67,
                        name: 'Temperatura',
                        description: "Continua realizando los retos y alcanza tu objetivo",
                        min: 0,
                        max: 10,
                        steps: 3,
                    },
                    {
                        id: 68,
                        name: 'Correr',
                        description: "Kilometros recorridos",
                        min: 0,
                        max: 100,
                        steps: 53,
                    }
                ]

            })
        }

        // helper functions
        function ok(body?) {
            console.log("fake backend for :", url);
            console.log("fake backend response :", body);
            
            return of(new HttpResponse({ status: 200, body }))
        }

    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};