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
/*                 case url.includes('login') && method === 'POST':
                    return authenticate(); */
/*                 case url.includes('/user/recovery_password') && method === 'POST':
                    return passwordRecovery(); */
                case url.endsWith('/user/informationUser') && method === 'GET':
                    return informationUser();
                case url.endsWith('user/legalTerm/lastAccepted') && method === 'GET':
                    return legalInformation();
                case url.endsWith('user/legalTerm/lastAccepted') && method === 'POST':
                    return confirmLegal();
/*                 case url.endsWith('/user/element/goals') && method === 'GET':
                    return goalsUser(); */
                /* case url.endsWith('/user/profiles') && method === 'GET':
                    return userProfile(); */
/*                 case url.endsWith('user/changePassword') && method === 'POST':
                    return changePassword();*/
                case url.endsWith('user/email_verification') && method === 'POST':
                    return smsVerification();
                case url.endsWith('user/code_verification') && method === 'POST':
                    return smsConfirmation(); 
/*                 case url.endsWith('user/familyUnit') && method === 'GET':
                    return familyUnit(); */
/*                 case url.endsWith('user/health_cards') && method === 'GET':
                    return getAPIhealthCards();
                case url.endsWith('user/health_cards') && method === 'POST':
                    return postAPIhealthCards();
                case url.includes('user/health_cards') && method === 'PUT':
                    return putAPIhealthCard();
                case url.includes('user/health_cards') && method === 'DELETE':
                    return deleteAPIhealthCards(); */
                case url.endsWith('user/emergency_contact') && method === 'GET':
                    return emergencyContact();
                case url.endsWith('user/emergency_contact') && method === 'POST':
                    return saveEmergencyContact();
                case url.includes('user/emergency_contact') && method === 'PUT':
                    return updateEmergencyContact();
                case url.endsWith('user/appointment') && method === 'GET':
                    return appointmentAgenda();
                // case url.endsWith('user/appointment') && method === 'POST':
                //     return appointmentAgenda();
                case url.endsWith('user/tracking/documents') && method === 'GET':
                    return getAPIdocumentsTracking();
                case url.endsWith('user/tracking/forms') && method === 'GET':
                    return getAPIformsTracking();
                case url.endsWith('user/element_category') && method === 'GET':
                    return getAPIcategoryElements();
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
                //token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOGRmMmJhODUzNjEwYTk2MmExZWNmYjI5YWIyZTUyOTY4NzI2NTI2MmMyNmQ3MjY5MzI1Y2U5ODEyMWZkYWIzNjE1ODFmOGI3ZDZkNDcyMmMiLCJpYXQiOjE2MjEyNzA0NzIsIm5iZiI6MTYyMTI3MDQ3MiwiZXhwIjoxNjUyODA2NDcyLCJzdWIiOiIxNTE4MyIsInNjb3BlcyI6W119.flXERBucYoy2Rywip-eZ7SV91Mc9laXGoS2wiIbbTSH7cC8cHvJKIGuHnrSXQdc0ZZzvnEaLUTIRwkIbPPStFhiZFsCBY88ji5qFGicyQu2xs5095QONUTeip-TWPDe4eSLrW4-5AKkDGwfR2-DhTUbkQeNxiviW77vu-pxv1vZM7ogzfs1NzD2Z-a6Ejp96sd1pz_ILheT7Z03jZj45ZAXdB5CsgD6FIqiN0U7bxv6xwjqHtM1iWzQSk-79aRQua6WPn3IqhafulN1fCsSNqF3pJIHAKSBKOjdAH-r5MOohjaPvmnsOojj1wE8EjG7WJZLaadsInt1prp-zGiOGyMoHNmTK75V_30Xm7sG019EBuzBTqn5jwu9v5AjGVuruYzaqwpqyTT3zSzjektR5SJMNBuO8-2t9m2wwwKSSDEGmu75lMRsc9rM7JErA931h27CI0k4jAIXbCUODVSwGzBcQleaS45cRY0GHxpI65c3qtetNFotR9Q_TWdQpp0PcCAMHO1D3hzQgJue_awpzYqdKwT3MteL4IH_zcsgP6XfYIsKOznku2UfY1UO4ZpUlnE_ZbXSB5-_WIySBzEj9nsnDw5WNooJH5iz9vxzNjOeSdgvC9ZopfWPnWJDoSjl0fjYS4ZZyWqxRofOTmjPC_u7uz4AbWZZTT_SE1u1MUQM",
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWUwNzAyMzQ2Mjc5NDNiNGI3ZjdkNGIwMGRjOTdlNmZjYmY1N2FmNTg1MDhmMDk5MmEwOWQyNWU0Yjk4MDcxMmU5MmQzOGIyMjM3MWJjYTciLCJpYXQiOjE2MjIwMjQ5MTAsIm5iZiI6MTYyMjAyNDkxMCwiZXhwIjoxNjUzNTYwOTEwLCJzdWIiOiIxNTE4MyIsInNjb3BlcyI6W119.CDMeoHnmdnGG06pFiyD7gJ4ukOqxt5Xey1etsRuLr5vmq3BOHryyKKxAbWS737o9gD-kAIOwtbqioYV-QG5DfdLulEFrV49IHelZS9k3j3apNFToeUF5vqoA1XrRp8faHqrjIRGSfHK76Pak0hQ4p-cMIv8-wFmxPJJDqfkiyhuKoPry2wcXucywggjtRD3b7fpsP524aubogv-aGHkUnRjPyZlKYFMwOzOL3Q3aNoZ9Ak8wxMcgRT_AhR1Di276XXRnr62XE5Z1P4J28y1shMjeMJcZkacIDHVw8sguL1T3BC39O-SLhAwTzADLT43U2ixJFYQGUWkovvIagHL60VmUEgX63mUOnUctSir3vmUQB8Tn9Jyo8q7Q11hUrG--1SyDBimKZUtZk_6mMTY1w4HQhAGwkoBXp6aUWpskuTDMbBLutfYR8Q5rCeICJtcUstg4Eqt8bVIK-DPj_vpFrLBG97nIOcrjYjLiUA7_IhHsFeSaWeKjZBJnASkqtsgfUDW__WEw8LR6cVoU0IDzhhxfVBy0ic_NhaqqppC-KyhSrUmt6ppZH5QvW8j4NBCTZfaWt5LfT9DCpTUQ-N6v8tjdPL4uyvFfzE3Qk2HYnnXc_X6MQh-AtsycOHIdMpnwUCUoOVfj62LzL7kYNmC32ZzZ_KMSJ8zAuRKiQDCT88E",
                roles: [
                    "patient",
                    "staff",
                    "superadmin"
                ],
                //firebaseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15cnc1aUBjb3ZpZC0zOWI5Ni5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXlydzVpQGNvdmlkLTM5Yjk2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxNTE4MyIsImlhdCI6MTYyMTI3MDQ3MiwiZXhwIjoxNjIxMjc0MDcyfQ.NqEtC0WbUdKdBYvw29FoGVQRwy765fMfsFeLRZsfXWJ85mUb0467cXFsglpiFx0b0gzkjS4hVGmJAHwmQZyCsiBzUiUZiiuLpWo2w3BgBpqVMWoG2cjmx-_V7MNLtYoeCKpN8Yi6cYdHVEf_qSxyMbOga5jUnR4RozL4oF_o26PKhdJkBEN2bl98epdB4so9drY8NtWdVCdZCyaZA3KB65y-mwu02lawA6v_JVELVRmtV-GrRX8d8gDvo2tOusGkVqEipN9IFtnAGX4heIoD_g1ySpeLPFMjrDwU8KxD5I6z487gA7U58tvCZrw9QhsRsDRQs7dsMUMptV5AR8xWtw",
                firebaseToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay15cnc1aUBjb3ZpZC0zOWI5Ni5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLXlydzVpQGNvdmlkLTM5Yjk2LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6XC9cL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbVwvZ29vZ2xlLmlkZW50aXR5LmlkZW50aXR5dG9vbGtpdC52MS5JZGVudGl0eVRvb2xraXQiLCJ1aWQiOiIxNTE4MyIsImlhdCI6MTYyMjAyNDkxMCwiZXhwIjoxNjIyMDI4NTEwfQ.emChHusTaUnIsJLoj3DbYahGwqlumm8iAbS3Hxf3JteKW-v-_JjrprSWjkvkWw60ZO6leaeW8TDR4hPr23e6-J_zUiu9ZX0qdJTM4pL3EUyQskPqs_ZImnZg7h4K0-BYxTly9-OoqPCqkncxjX0dfeKaufkl3E20LshXThvXMG1rv49HhuNtdd3oDwQF97ttu-HJlxdt6rssf3EtgYBgmQaMOfh43kbZhNMDbI0MkDl-IfmtfjRx4dB3grZ2NVxtR0Bsg5IZxHFqes-77Y8GTIASyMs7SW7JwnNLm3W1bBnsZn7djsmLfPyRUHlCKrzvZUhy7TzwyyEIz-IktoHSXA",
                familyUnit: []
            })
        }

        function smsVerification() {
         
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function smsConfirmation() {
         
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function changePassword() {
         
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function userProfile() {
         
            return ok({
                    idUser: 15183,
                    image: 'assets/icons/Mi Perfil.svg',
                    first_name: 'David',
                    last_name: 'Valarezo León',
                    blood_group: 'O+',
                    birthdate_european: null,
                    gender: 'Masculino',
                    weight: '53 Kg',
                    height: '165 cm',
                    diagnostics: [
                        'Diabetes',
                         'Anemia'
                    ],
                    allergies: [
                        'Melocotón',
                        'Frutos secos'
                    ]               
            })
        }

        function informationUser() {
            return ok({
                username: 'David Valarezo León',
                first_name: "David",
                last_name: "Valarezo León",
                idUser: 15183,
                image: 'assets/icons/Mi Perfil.svg',
                agendas: [
                    {
                        id: 668,
                        title: 'Dermatología',
                        doctor: 'Dr. Ricardo Sánchez',
                        description: '',
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
                        description: '',
                        start_time: "09:00",
                        start_date: "30/06/2021 09:00",
                        end_date: "30/06/2021 09:00",
                        start_date_iso8601: "2021-06-30T09:00:00+02:00",
                        hide: false
                    },
                    {
                        id: 889,
                        title: 'Pediatría',
                        doctor: 'Dr. Antonio Castellanos Mejía',
                        description: '',
                        start_time: "12:00",
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
                        name: "Desayuno",
                        id: 0,
                        hour: '09:00',
                        start_date: "30/06/2021 09:00",
                        image: null,
                        description: "Yogurt desnatado con semillas de linaza"
                    },
                    {
                        name: "Almuerzo",
                        id: 1,
                        hour: '12:00',
                        start_date: "30/06/2021 12:00",
                        image: null,
                        description: "Yogurt desnatado con semillas de linaza, frutos secos"
                    },
                    {
                        name: "Hora del Café",
                        id: 0,
                        hour: '15:00',
                        start_date: "30/06/2021 15:00",
                        image: null,
                        description: "Café negro, 2 croissant de chocolate"
                    },
                    {
                        name: "Cena",
                        id: 2,
                        hour: '18:00',
                        start_date: "30/06/2021 18:00",
                        image: null,
                        description: "Rollitos de queso"
                    },
                    {
                        name: "Merienda",
                        id: 3,
                        hour: '21:00',
                        start_date: "30/06/2021 21:00",
                        image: null,
                        description: "Jamón de pavo, Rollitos de queso"
                    }
                ],
                drugs: [
                    {
                        id: 1,
                        name:  "Prueba Ibuprofeno (1g)",
                        date_intake: "2021-05-17 12:00:00",
                        hour_intake: "12:00",
                    },
                    {
                        id: 2,
                        name: "Cefazolina (500 mg)",
                        date_intake: "2021-05-17 12:30:00",
                        hour_intake: "12:30",
                    },
                    {
                        id: 3,
                        name: "Cefuroxima Apotex (200 mg)",
                        date_intake: "2021-05-17 18:00:00",
                        hour_intake: "18:00",
                    },
                    {
                        id: 4,
                        name: "Gamalate B6 (500 mg)",
                        date_intake: "2021-05-17 12:30:00",
                        hour_intake: "12:30",
                    },
                    {
                        id: 5,
                        name: "Pastilla Cetirizina (20 mg)",
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
                        steps: 0.6,
                    },
                    {
                        id: 67,
                        name: 'Temperatura',
                        description: "Continua realizando los retos y alcanza tu objetivo",
                        min: 0,
                        max: 10,
                        steps: 0.3,
                    },
                    {
                        id: 68,
                        name: 'Correr',
                        description: "Kilometros recorridos",
                        min: 0,
                        max: 100,
                        steps: 0.53,
                    }
                ]

            })
        }

        function goalsUser(){
            {
                return ok({
                    success: true,
                    goals: [
                        {
                            id: 22,
                            user_id: 12473,
                            element_id: 71,
                            from_date: "2020-11-29 00:00:00",
                            to_date: null,
                            goalType: "a<x<b",
                            value1: "65",
                            value2: "68",
                            frequency: "daily",
                            score: 10,
                            created_at: "2020-11-30T09:56:45.000000Z",
                            updated_at: "2020-11-30T09:56:45.000000Z",
                            deleted_at: null,
                            typeString: " Entre 65 y 68",
                            frequencyString: "Cada dia",
                            element: {
                                id: 71,
                                center_id: 10,
                                name: "Peso",
                                element_type: "constant",
                                element_group_id: 2,
                                description: null,
                                min: "0",
                                max: "1000",
                                steps: "0",
                                data_type: "numeric",
                                ext_code: "weight",
                                ext_id: null,
                                order: null,
                                units: "",
                                element_unit_id: 57,
                                vat_id: null,
                                price: null,
                                created_at: "2020-08-19T09:26:15.000000Z",
                                updated_at: "2021-02-24T11:16:31.000000Z",
                                deleted_at: null,
                                name_for_form: "Peso",
                                element_unit: {
                                    id: 57,
                                    center_id: 10,
                                    name: "Kilogramos",
                                    abbreviation: "kg",
                                    description: null,
                                    ext_code: "",
                                    created_at: "2020-08-19T09:25:53.000000Z",
                                    updated_at: "2020-08-19T09:25:53.000000Z",
                                    deleted_at: null
                                }
                            }
                        },
                        {
                            id: 27,
                            user_id: 12473,
                            element_id: 71,
                            from_date: null,
                            to_date: null,
                            goalType: "<",
                            value1: "65",
                            value2: null,
                            frequency: "daily",
                            score: 10,
                            created_at: "2021-04-08T15:57:42.000000Z",
                            updated_at: "2021-04-08T15:57:42.000000Z",
                            deleted_at: null,
                            typeString: " Menor que 65",
                            frequencyString: "Cada dia",
                            element: {
                                id: 71,
                                center_id: 10,
                                name: "Peso",
                                element_type: "constant",
                                element_group_id: 2,
                                description: null,
                                min: "0",
                                max: "1000",
                                steps: "0",
                                data_type: "numeric",
                                ext_code: "weight",
                                ext_id: null,
                                order: null,
                                units: "",
                                element_unit_id: 57,
                                vat_id: null,
                                price: null,
                                created_at: "2020-08-19T09:26:15.000000Z",
                                updated_at: "2021-02-24T11:16:31.000000Z",
                                deleted_at: null,
                                name_for_form: "Peso",
                                element_unit: {
                                    id: 57,
                                    center_id: 10,
                                    name: "Kilogramos",
                                    abbreviation: "kg",
                                    description: null,
                                    ext_code: "",
                                    created_at: "2020-08-19T09:25:53.000000Z",
                                    updated_at: "2020-08-19T09:25:53.000000Z",
                                    deleted_at: null
                                }
                            }
                        },
                        {
                            id: 27,
                            user_id: 12473,
                            element_id: 71,
                            from_date: null,
                            to_date: "2021-10-29 00:00:00",
                            goalType: "<",
                            value1: "65",
                            value2: null,
                            frequency: "daily",
                            score: 6,
                            created_at: "2021-04-08T15:57:42.000000Z",
                            updated_at: "2021-04-08T15:57:42.000000Z",
                            deleted_at: null,
                            typeString: " Menor que 65",
                            frequencyString: "Cada dia",
                            element: {
                                id: 71,
                                center_id: 10,
                                name: "Peso",
                                element_type: "constant",
                                element_group_id: 2,
                                description: null,
                                min: "0",
                                max: "1000",
                                steps: "0",
                                data_type: "numeric",
                                ext_code: "weight",
                                ext_id: null,
                                order: null,
                                units: "",
                                element_unit_id: 57,
                                vat_id: null,
                                price: null,
                                created_at: "2020-08-19T09:26:15.000000Z",
                                updated_at: "2021-02-24T11:16:31.000000Z",
                                deleted_at: null,
                                name_for_form: "Peso",
                                element_unit: {
                                    id: 57,
                                    center_id: 10,
                                    name: "Kilogramos",
                                    abbreviation: "kg",
                                    description: null,
                                    ext_code: "",
                                    created_at: "2020-08-19T09:25:53.000000Z",
                                    updated_at: "2020-08-19T09:25:53.000000Z",
                                    deleted_at: null
                                }
                            }
                        },
                        {
                            id: 27,
                            user_id: 12473,
                            element_id: 71,
                            from_date: "2021-1-29 00:00:00",
                            to_date: "2021-12-29 00:00:00",
                            goalType: "<",
                            value1: "65",
                            value2: null,
                            frequency: "daily",
                            score: 7,
                            created_at: "2021-04-08T15:57:42.000000Z",
                            updated_at: "2021-04-08T15:57:42.000000Z",
                            deleted_at: null,
                            typeString: " Menor que 65",
                            frequencyString: "Cada dia",
                            element: {
                                id: 71,
                                center_id: 10,
                                name: "Peso",
                                element_type: "constant",
                                element_group_id: 2,
                                description: null,
                                min: "0",
                                max: "1000",
                                steps: "0",
                                data_type: "numeric",
                                ext_code: "weight",
                                ext_id: null,
                                order: null,
                                units: "",
                                element_unit_id: 57,
                                vat_id: null,
                                price: null,
                                created_at: "2020-08-19T09:26:15.000000Z",
                                updated_at: "2021-02-24T11:16:31.000000Z",
                                deleted_at: null,
                                name_for_form: "Peso",
                                element_unit: {
                                    id: 57,
                                    center_id: 10,
                                    name: "Kilogramos",
                                    abbreviation: "kg",
                                    description: null,
                                    ext_code: "",
                                    created_at: "2020-08-19T09:25:53.000000Z",
                                    updated_at: "2020-08-19T09:25:53.000000Z",
                                    deleted_at: null
                                }
                            }
                        }
                    ]
                })
                    
            }
        }

        function familyUnit() {
         
            return ok(
                [
                    {
                        id: 12737,
                        name: "Castañeda, Juanito",
                        initials: "CJ",
                        age: null,
                        thumbnail: "https://via.placeholder.com/300x300.png?text=CJ",
                        family_relationship: "Relación familiar"
                    },
                    {
                        id: 13015,
                        name: "adjunto, Tania",
                        initials: "AD",
                        age: null,
                        thumbnail: "https://via.placeholder.com/300x300.png?text=AD",
                        family_relationship: "Relación familiar"
                    }
                ] 
            )
        }

        function getAPIhealthCards() {
         
            return ok(
                [
                    {
                        id: 12737,
                        name: "Seguridad Social",
                        modality: "Mutuas Seguros",
                        affiliation_number: "0006852369517",
                        expiration_date: "2022-04-01T15:57:42.000000Z",
                        expedition_date: "2013-08-08T15:57:42.000000Z",
                        thumbnail: "https://via.placeholder.com/300x200/09f/fff?text=Seguridad+S",
                    },
                    {
                        id: 13015,
                        name: "Seguro Asisa",
                        modality: "Sanidad Pública",
                        affiliation_number: "147852369517",
                        expiration_date: "2023-08-08T15:57:42.000000Z",
                        expedition_date: "2003-08-08T15:57:42.000000Z",
                        thumbnail: "https://via.placeholder.com/300x300.png?text=SA",
                    },
                    {
                        id: 12739,
                        name: "Cat Salut",
                        modality: "Sanidad Pública",
                        affiliation_number: "VALE0900413002",
                        expiration_date: null,
                        expedition_date: "2019-08-08T15:57:42.000000Z",
                        thumbnail: "https://via.placeholder.com/300x200/09f/fff?text=Seguridad+S",
                    },
                    {
                        id: 13089,
                        name: "Seguros Catalana Occidente",
                        modality: "Sanidad Privada",
                        affiliation_number: "DDD 007852369517",
                        expiration_date: "2021-04-15T15:57:42.000000Z",
                        expedition_date: null,
                        thumbnail: "https://via.placeholder.com/300x300.png?text=AD",
                    }
                ] 
            )
        }

        function postAPIhealthCards(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function putAPIhealthCard(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function deleteAPIhealthCards(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function confirmLegal() {
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function passwordRecovery(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function legalInformation() {
         
            return ok(
                    {
                        success: true,
                        legalTerm:
                            {
                                id: 2,
                                center_id: 1,
                                legal_text: null,
                                version: 1,
                                active: 1,
                                created_at: "2021-06-09T14:52:04.000000Z",
                                updated_at: "2021-06-09T14:52:04.000000Z",
                                deleted_at: null
                            }
                    }
            )
        }

        function emergencyContact() {
         
            return ok(
                [
                    {
                        id: 12737,
                        full_name: "Asunción Mateo",
                        initials: "AM",
                        phone: "671467799",
                        thumbnail: "https://via.placeholder.com/300x300.png?text=AM",
                        family_relationship: "Hermano"
                    },
                    {
                        id: 13015,
                        full_name: "Eduard García",
                        initials: "EG",
                        phone: "671467799",
                        thumbnail: "https://via.placeholder.com/300x300.png?text=AD",
                        family_relationship: "Madre"
                    },
                    {
                        id: 13015,
                        full_name: "David Serrano",
                        initials: "DS",
                        phone: "671467799",
                        thumbnail: "https://via.placeholder.com/300x300.png?text=DS",
                        family_relationship: "Padre"
                    }
                ] 
            )
        }

        function saveEmergencyContact(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function updateEmergencyContact(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        // helper functions
        function ok(body?) {
            console.log("fake backend for :", url);
            console.log("fake backend response :", body);
            
            return of(new HttpResponse({ status: 200, body }))
        }

        function appointmentAgenda() {
         
            return ok(
                [
                    {
                        id: 12737,
                        title: "Seguridad Social",
                        type: 'Recordatorio Médico',
                        endTime: "2021-06-06T15:57:42.000000Z",
                        startTime: "2021-06-06T16:57:42.000000Z",
                    },
                    {
                        id: 13015,
                        title: "Seguridad Social",
                        type: 'Cita Extracción Sangre',
                        endTime: "2021-07-06T15:57:42.000000Z",
                        startTime: "2021-07-06T16:57:42.000000Z",
                    },
                    {
                        id: 12739,
                        title: "Seguridad Social",
                        type: 'Cita Nutricionista',
                        startTime: "2021-06-07T16:57:42.000000Z",
                        endTime: "2021-06-07T17:57:42.000000Z",
                    },
                    {
                        id: 13089,
                        title: "Seguridad Social",
                        type: 'Recordatorio Personal',
                        endTime: "Fri Jun 25 2021 14:28:00 GMT+0200",
                        startTime: "Fri Jun 25 2021 12:28:00 GMT+0200",
                    },
                    {
                        id: 13015,
                        title: "Seguridad Social",
                        type: 'Cita Extracción Sangre',
                        endTime: "2021-06-06T15:57:42.000000Z",
                        startTime: "2021-06-06T16:57:42.000000Z",
                    },
                    {
                        id: 12739,
                        title: "Seguridad Social",
                        type: "Mutuas Seguros",
                        endTime: "2021-06-07T15:57:42.000000Z",
                        startTime: "2021-06-07T16:57:42.000000Z",
                    },
                    {
                        id: 13089,
                        title: "Seguridad Social",
                        type: 'Recordatorio Personal',
                        endTime: "2021-06-08T15:57:42.000000Z",
                        startTime: "2021-06-08T16:57:42.000000Z",
                    },
                    {
                        id: 13015,
                        title: "Seguridad Social",
                        type: 'Cita Extracción Sangre',
                        endTime: "2021-06-06T15:57:42.000000Z",
                        startTime: "2021-06-06T16:57:42.000000Z",
                    },
                    {
                        id: 12739,
                        title: "Seguridad Social",
                        type: "Mutuas Seguros",
                        endTime: "2021-06-07T15:57:42.000000Z",
                        startTime: "2021-06-07T16:57:42.000000Z",
                    },
                    {
                        id: 13089,
                        title: "Seguridad Social",
                        type: 'Recordatorio Personal',
                        endTime: "2021-06-08T15:57:42.000000Z",
                        startTime: "2021-06-08T16:57:42.000000Z",
                    },
                    {
                        id: 13089,
                        title: "Seguridad Social",
                        type: 'Recordatorio Personal',
                        endTime: "2021-08-08T15:57:42.000000Z",
                        startTime: "2021-08-08T16:57:42.000000Z",
                    }

                ] 
            )
        }

        function getAPIdocumentsTracking(){
            return ok([
                {
                    date: "2021-06-08T15:57:42.000000Z",
                    documents:[
                        {
                            id: 12737,
                            type: "Análisis de Sangre",
                            title: "Resultados de seguimiento de colesterol",
                            doctor: "Dr. Asunción Mateo",
                            date: "2021-06-08T15:15:42.000000Z",
                            reason: "Seguimiento Colesterol",
                            especiality: "Medicina General",
                            center: "Hospital Gregorio Marañon"

                        },
                        {
                            id: 13015,
                            type: "Análisis de Heces",
                            title: "Resultados de seguimiento de colesterol",
                            doctor: "Dr. Patricio Mora Mateo",
                            date: "2021-06-08T17:30:42.000000Z",
                            reason: "Seguimiento Colesterol",
                            especiality: "Medicina General",
                            center: "Hospital Gregorio Marañon"
                        },
                        {
                            id: 130987,
                            type: "Análisis de Orina",
                            title: "Resultados de seguimiento hepatitis",
                            doctor: "Dr. Mata Toro",
                            date: "2021-06-08T20:00:42.000000Z",
                            reason: "Seguimiento Colesterol",
                            especiality: "Medicina General",
                            center: "Hospital Gregorio Marañon"
                        }
                    ] 
                },
                {
                    date: "2021-06-09T15:57:42.000000Z",
                    documents:[
                        {
                            id: 12737,
                            type: "Análisis de Sangre",
                            title: "Resultados de seguimiento de colesterol",
                            doctor: "Asunción Mateo",
                            date: "2021-06-09T07:57:42.000000Z",
                        },
                        {
                            id: 13015,
                            type: "Análisis de Orina",
                            title: "Resultados de seguimiento hepatitis",
                            doctor:"Eduard García",
                            date: "2021-06-09T10:57:42.000000Z",
                        },
                        {
                            id: 13019,
                            type: "Análisis de Sangre",
                            title: "Resultados de seguimiento de colesterol",
                            doctor: "David Serrano",
                            date: "2021-06-09T11:57:42.000000Z",
                        }
                    ] 
                },
                {
                    date: "2021-06-18T15:57:42.000000Z",
                    documents:[
                        {
                            id: 12737,
                            type: "Análisis de Orina",
                            title: "Resultados de seguimiento hepatitis",
                            doctor: "Asunción Mateo",
                            date: "2021-06-18T15:57:42.000000Z",
                        }
                    ] 
                }
            ])
        }

        function getAPIformsTracking(){
            return ok([
                {
                    id: 12737,
                    type: "Formulario Seguimiento COVID-19",
                    title: "Queremos saber cómo te encuentras",
                    doctor: "Dr. Asunción Mateo",
                    date: "2021-06-08T15:15:42.000000Z",
                },
                {
                    id: 13015,
                    type: "Formulario Seguimiento Peso",
                    title: "Queremos conocer como van tus avances",
                    doctor: "Dr. Patricio Mora Mateo",
                    date: "2021-06-08T17:30:42.000000Z",
                },
                {
                    id: 130987,
                    type: "Formulario Seguimiento Glucosa",
                    title: "Cuentanos si todo ha ido bien esta semana",
                    doctor: "Dr. Mata Toro",
                    date: "2021-06-08T20:00:42.000000Z",
                }
            ])
        }

        function getAPIcategoryElements(){
            return ok([
                {
                    group: 'Actividad Física',
                    elements: [
                        {id: 71, name: 'Consumo energético', units: 'Cal'},
                        {id: 31, name: 'Distancia', units: 'Km'},
                        {id: 30, name: 'Pasos', units: 'm'}
                    ]
                },
                {
                    group: 'Bioquímica',
                    elements: [
                        {id: 3, name: 'Glucosa', units: 'mg/dl'},
                        {id: 63, name: 'Colestero', units: 'mg/dl'},
                    ]
                },
                {
                    group: 'Constantes',
                    elements: [
                        {id: 58, name: 'Altura', units: 'm'},
                        {id: 71, name: 'Peso', units: 'Kg'},
                        {id: 39, name: 'Ritmo cardiaco', units: 'LPM'},
                        {id: 61, name: 'Electrocardiograma', units: 'mm/seg'},
                        {id: 4, name: 'Saturación de oxígeno', units: '%'},
                        {id: 1, name: 'Temperatura', units: 'ºC'},
                        {id: 33, name: 'Presión arterial', units: 'mmHg'}
                    ]
                }
            ])
        }

    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};