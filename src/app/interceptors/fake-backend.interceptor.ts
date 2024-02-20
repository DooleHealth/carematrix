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
                // case url.endsWith('/user/informationUser') && method === 'GET':
                //     return informationUser();
/*                 case url.endsWith('user/legalTerm/lastAccepted') && method === 'GET':
                    return legalInformation();
                case url.endsWith('user/legalTerm/lastAccepted') && method === 'POST':
                    return confirmLegal(); */
/*                 case url.endsWith('/user/element/goals') && method === 'GET':
                    return goalsUser(); */
                /* case url.endsWith('/user/profiles') && method === 'GET':
                    return userProfile(); */
/*                 case url.endsWith('user/changePassword') && method === 'POST':
                    return changePassword();*/
                // case url.endsWith('user/email_verification') && method === 'POST':
                //     return smsVerification();
                // case url.endsWith('user/code_verification') && method === 'POST':
                //     return smsConfirmation(); 
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
/*                 case url.endsWith('user/emergency_contact') && method === 'GET':
                    return emergencyContact();
                case url.endsWith('user/emergency_contact') && method === 'POST':
                    return saveEmergencyContact();
                case url.includes('user/emergency_contact') && method === 'PUT':
                    return updateEmergencyContact();
                case url.endsWith('user/appointment') && method === 'GET':
                    return appointmentAgenda();
                 case url.endsWith('user/appointment') && method === 'POST':
                     return appointmentAgenda();
                case url.endsWith('user/tracking/documents') && method === 'GET':
                    return getAPIdocumentsTracking();
                case url.endsWith('user/tracking/forms') && method === 'GET':
                    return getAPIformsTracking();
                case url.endsWith('user/element_category') && method === 'GET':
                    return getAPIcategoryElements(); */
                /***
                 * Reminders
                 */
/*                 case url.endsWith('user/reminder') && method === 'GET':
                    return getAPIreminders();
                case url.endsWith('user/reminder/') && method === 'POST':
                    return postAPIaddReminder();
                case url.includes('user/reminder/id') && method === 'GET':
                    return getAPIreminderID(); */
/*                 case url.includes('user/patients') && method === 'GET':
                    return getAPIpatients(); */
                // case url.includes('sharecareplan/goals') && method === 'GET':
                //     return getAPI_SCP_goals();
                case url.includes('user/news') && method === 'GET':
                    return getAPI_News();
          //  case url.includes('user/dietaryIntakes') && method === 'GET':
                //        return getAPI_DietsToday();
                        case url.includes('user/receipt') && method === 'GET':
                            return getAPI_Recipes();
                            case url.includes('user/testimonials') && method === 'GET':
                            return getAPI_Testimonials();
                            case url.includes('sharedcareplan/formsToday') && method === 'GET':
                            return getAPI_FormsToday()
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
                        {id: 63, name: 'Colesterol', units: 'mg/dl'},
                    ]
                },
                {
                    group: 'Constantes',
                    elements: [
                        {id: 32, name: 'Temperatura', units: 'ºC'},
                        {id: 71, name: 'Peso', units: 'Kg'},
                        {id: 58, name: 'Altura', units: 'm'},
                        {id: 39, name: 'Ritmo cardiaco', units: 'LPM'},
                        {id: 61, name: 'Electrocardiograma', units: 'mm/seg'},
                        {id: 4, name: 'Saturación de oxígeno', units: '%'},
                        {id: 33, name: 'Presión arterial', units: 'mmHg'}
                    ]
                }
            ])
        }

        function postAPIaddReminder(){
            return ok({
                success: true,
                idUser: 15183,
                status: 200,
                message: "OK.",
                data: null
            })
        }

        function getAPIreminderID(){
            return ok({
                reminder: {
                    id: 659,
                    user_id: 15591,
                    origin: 0,
                    title: "Tomar la tensión arterial",
                    description: "Repetir la toma cuando:- Máxima por encima de 140 mmHg",
                    start_date: "2021-06-07 18:00:00",
                    end_date: "2021-09-07 18:00:00",
                    all_day: true,
                    reminderType: {
                        id: 43,
                        name: "Recordatorio Médico",
                        color: null
                    },
                    frequency: true ,
                    day1:true,
                    day2:true,
                    day3:true,
                    day4:true,
                    day5:true,
                    day6:false,
                    day7:false,
                    alert: "5 minutos antes",
                    finish_repeat: "Nunca",
                    show_as: null,
                    agenda:{
                        id: 567,
                        title: "Cita relacionada Colonoscopia",
                        agenda_type: {
                            id: 62,
                            name: "Añadida por el usuario",
                            model_type: "App\\Visit",
                            description: "",
                            color: null
                        }
                    },
                    goal:null
                }
            })
        }


        function getAPIreminders(){
            return ok({
                reminders: [
                    {
                        id: 659,
                        user_id: 15591,
                        origin: 1,
                        title: "Tomar la tensión arterial",
                        description: "Repetir la toma cuando:- Máxima por encima de 140 mmHg",
                        start_date: "2021-07-27 18:00:00",
                        end_date: "2021-09-07 18:00:00",
                        all_day: true,
                        reminderType: {
                            id: 43,
                            name: "Recordatorio Médico",
                            color: null
                        },
                        frequency: true ,
                        day1:true,
                        day2:true,
                        day3:true,
                        day4:true,
                        day5:true,
                        day6:false,
                        day7:false,
                        alert: "5 minutos antes",
                        finish_repeat: "Nunca",
                        show_as: null,
                        agenda:{
                            id: 567,
                            title: "Cita relacionada Colonoscopia",
                            agenda_type: {
                                id: 62,
                                name: "Añadida por el usuario",
                                model_type: "App\\Visit",
                                description: "",
                                color: null
                            }
                        },
                        goal:null
                    },
                    {
                        id: 660,
                        user_id: 15591,
                        origin: 1,
                        title: "Realizar 4000 pasos diarios",
                        description:"Caminar mínimo 30 minutos diarios",
                        start_date: "2021-07-27 18:00:00",
                        end_date: "2021-09-07 18:00:00",
                        all_day: true,
                        reminderType: {
                            id: 43,
                            name: "Recordatorio Actividad",
                            color: null
                        },
                        frequency: true ,
                        day1:true,
                        day2:true,
                        day3:true,
                        day4:true,
                        day5:true,
                        day6:false,
                        day7:false,
                        alert: "5 minutos antes",
                        finish_repeat: "Nunca",
                        show_as: null,
                        agenda:{
                            id: 567,
                            title: "Cita relacionada Colonoscopia",
                            agenda_type: {
                                id: 62,
                                name: "Añadida por el usuario",
                                model_type: "App\\Visit",
                                description: "",
                                color: null
                            }
                        },
                        goal:{
                            id: 567,
                            title: "Paso 4000 diarios"
                        }
                    }
                ]
            })
        }

        function getAPIpatients(){
            return ok({
                success: true,
                status: 200,
                patients: [
                    {name: 'David Valarezo león'},
                    {name: 'Fernando Roque'},
                    {name: 'María Mendoza Salcedo'},
                ]
            })
        }

        function getAPI_SCP_goals(){
            return ok({
                success: true,
                status: 200,
                goals: [
                    {
                        id: 551, //x
                        user_id: 789,
                        drug_id: 470,
                        origin_type: "App\\ShareCarePlan",
                        from_date: "2022-02-16 00:00:00", //x
                        is_new_content: false,
                        content_type: "App\\MedicationPlan",
                        aderence: {
                            total_percentage: 33,
                            drug_takes_percentage: 0,
                        },
                        last_accepted_or_declined: {
                            id: 10832,
                            user_id: 470,
                            target_type: "App\\MedicationPlan",
                            target_id: 551,
                            type: "declined", //x
                        },
                        drug: {
                            id: 470,
                            name: "AMOXICILINA/ACIDO CLAVULANICO NORMON 875 mg/125 mg POLVO PARA SUSPENSION ORAL EN SOBRES EFG , 500 sobres"
                        }
                    },
                    {
                        id: 784,
                        user_id: 470,
                        drug_id: 1,
                        origin_type: "App\\ShareCarePlan",
                        from_date: "2023-11-24 11:32:00",
                        is_new_content: false,
                        isPermitedModify: true,
                        state_string: "Finalitzat",
                        frequencyName: "Cada dia",
                        patient_has_created_times: false,
                        aderence: {
                            total_percentage: 100,
                            drug_takes_percentage: 0,
                        },
                        content_type: "App\\MedicationPlan",
                        last_accepted_or_declined: {
                            id: 10791,
                            user_id: 470,
                            target_type: "App\\MedicationPlan",
                            target_id: 784,
                            type: "accepted",
                            value: "Lo he aceptado desde API",
                        },
                        drug: {
                            id: 1,
                            name: "ABACAVIR/LAMIVUDINA  DR. REDDYS 600 MG/300 MG COMPRIMIDOS RECUBIERTOS CON PELICULA EFG 30 comprimidos"
                        },
                        medication_plan_times: []
                    },
                    {
                        id: 784,
                        user_id: 470,
                        drug_id: 1,
                        origin_type: "App\\ShareCarePlan",
                        from_date: "2023-11-24 11:32:00",
                        is_new_content: true,
                        isPermitedModify: true,
                        state_string: "Finalitzat",
                        frequencyName: "Cada dia",
                        patient_has_created_times: false,
                        aderence: {
                            total_percentage: 0,
                            drug_takes_percentage: 0,
                        },
                        content_type: "App\\MedicationPlan",
                        last_accepted_or_declined: {
                            id: 10791,
                            user_id: 470,
                            target_type: "App\\MedicationPlan",
                            target_id: 784,
                            type: null,
                            value: "Lo he aceptado desde API",
                        },
                        drug: {
                            id: 1,
                            name: "ABACAVIR/LAMIVUDINA  DR. REDDYS 600 MG/300 MG COMPRIMIDOS RECUBIERTOS CON PELICULA EFG 30 comprimidos"
                        },
                        medication_plan_times: []
                    }
                ]
            })
        }
        
        function getAPI_News(){
            return ok({
                success: true,
                status: 200,
                news: [
                    {
                        id: 4,
                        filtersCompleted: {
                            gender: true
                        },
                        subject: "An unclickbait headline",
                        url: false,
                        content: "<p>Again, this is an unclickbait news with an unclickbait headline.</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                        files: [
                            {
                                id: 75,
                                mediable_type: "App\\News",
                                mediable_id: 4,
                                collection_name: "",
                                name: "cover",
                                description: null,
                                file_name: "private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png",
                                mime_type: "image/png",
                                disk: "s3",
                                size: 11731,
                                manipulations: "",
                                custom_properties: "",
                                responsive_images: "",
                                order_column: null,
                                created_at: "2023-12-11T12:03:07.000000Z",
                                updated_at: "2023-12-11T12:03:07.000000Z",
                                deleted_at: null,
                                temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=bbf0d20c5c6242485c584cb998524bb84e3cd3339f83557875cc3189ac7698fc",
                                thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                                createdDiffForHumans: "2 months ago",
                                size_mb: 0.01
                            }
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123,
                        routerlink: "new-detail"
                    },
                    {
                        id: 3,
                        filtersCompleted: {
                            gender: true
                        },
                        subject: "everyone",
                        url: false,
                        content: "<p>everyone</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover:  "https://via.placeholder.com/300x300.png?text=Th",
                        files: [
                           
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123,
                        routerlink: "new-detail"
                    },
                    {
                        id: 2,
                        filtersCompleted: {
                            gender: true
                        },
                        routerlink: "new-detail",
                        subject: "An unclickbait headline",
                        url: false,
                        content: "<p>Again, this is an unclickbait news with an unclickbait headline.</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                        files: [
                           
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123
                    }
                ]
            })
        }
        function getAPI_Testimonials(){
            return ok({
                success: true,
                status: 200,
                testimonials: [
                    {
                        id: 4,
                        filtersCompleted: {
                            gender: true
                        },
                        subject: "An unclickbait headline",
                        url: false,
                        content: "<p>Again, this is an unclickbait news with an unclickbait headline.</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                        files: [
                            {
                                id: 75,
                                mediable_type: "App\\News",
                                mediable_id: 4,
                                collection_name: "",
                                name: "cover",
                                description: null,
                                file_name: "private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png",
                                mime_type: "image/png",
                                disk: "s3",
                                size: 11731,
                                manipulations: "",
                                custom_properties: "",
                                responsive_images: "",
                                order_column: null,
                                created_at: "2023-12-11T12:03:07.000000Z",
                                updated_at: "2023-12-11T12:03:07.000000Z",
                                deleted_at: null,
                                temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=bbf0d20c5c6242485c584cb998524bb84e3cd3339f83557875cc3189ac7698fc",
                                thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                                createdDiffForHumans: "2 months ago",
                                size_mb: 0.01
                            }
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123,
                        routerlink: "testimonials-detail"
                    },
                    {
                        id: 3,
                        filtersCompleted: {
                            gender: true
                        },
                        subject: "everyone",
                        url: false,
                        content: "<p>everyone</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover:  "https://via.placeholder.com/300x300.png?text=Th",
                        files: [
                           
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123,
                        routerlink: "testimonials-detail"
                    },
                    {
                        id: 2,
                        filtersCompleted: {
                            gender: true
                        },
                        routerlink: "testimonials-detail",
                        subject: "An unclickbait headline",
                        url: false,
                        content: "<p>Again, this is an unclickbait news with an unclickbait headline.</p>",
                        scheduled_date: "2023-12-14 18:30:00",
                        created_at: "2023-12-11T12:01:05.000000Z",
                        from_date: "2023-12-11 21:00:00",
                        to_date: null,
                        cover: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/SXD3m7lEbGpPZr0IyaXhWHoZfiL8i76DZQuDMFr8.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T093103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=07614e7ba88259d10156439c5c411f7d91cf68c19b6508b8614bd9792c652b66",
                        files: [
                           
                        ],
                        statusable: [],
                        source: null,
                        listResearch: [
                            {
                                id: 1,
                                name: "Research"
                            },
                            {
                                id: 4,
                                name: "Multimorbidity"
                            }
                        ],
                        timeReading: 20,
                        description: "esto es una pequeña descripcion",
                        likes: 123
                    }
                ]
            })
        }
        function getAPI_DietsToday(){
            return ok({
                success: true,
                status: 200,
                diets: [
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T07:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                     {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T13:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T12:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T21:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    }
                ]
            })
        }
        
        function getAPI_Recipes(){
            return ok({
                success: true,
                status: 200,
                recipes: [
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T07:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                     {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T13:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T12:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    },
                    {
                        name: "Chicken soup",
                        id: 3,
                        image: {
                            id: 64,
                            mediable_type: "App\\Diet",
                            mediable_id: 3,
                            collection_name: "",
                            name: "cover",
                            description: null,
                            file_name: "private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg",
                            mime_type: "image/jpeg",
                            disk: "s3",
                            size: 55629,
                            manipulations: "",
                            custom_properties: "{\"thumbnail\":\"private_content\\/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg\"}",
                            responsive_images: "",
                            order_column: null,
                            created_at: "2023-12-07T15:44:17.000000Z",
                            updated_at: "2023-12-07T15:44:17.000000Z",
                            deleted_at: null,
                            temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f6349b7f572e64364ef474d173dfcb1f929ba0bc003cc14f2ac6ac5fe41da634",
                            thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/Fm5OJBboXDHu7EoOxFEvv3SGEbtq9q0cBltsnC2s-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240215%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240215T134842Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=486844b233c723bece6953bffd1c33640238b1e33dae143f7ba98645d6bfe73b",
                            createdDiffForHumans: "2 months ago",
                            size_mb: 0.05
                        },
                        assigned: "directly",
                        from_date: null,
                        to_date: null,
                        currentlyActive: true,
                        date:"2024-02-15T21:30:05.000000Z",
                        source: "<p>test_test</p>",
                        calories: 300,
                        description: "breakfast"
                    }
                ]
            })
        }

        function getAPI_FormsToday(){
            return ok({
                success: true,
                status: 200,
                forms: [
                    {
                id: 16,
                form_id: 4,
                title: "QUESTIONÁRIO SF-36",
                description: null,
                from_date: "2024-02-20 15:59:00",
                to_date: null,
                minutes_from: null,
                minutes_to: null,
                forgotten: 0,
                active: 1,
                frequency: "daily",
                frequency_modality_asign: null,
                computed_until: null,
                computed_until_to_future: null,
                observations: null,
                content_type: "App\\FormProgrammation",
                alarms: [],
                formProgrammationTimes: [
                    {
                        id: 16,
                        form_programmation_id: 16,
                        time: "16:01:00",
                        created_at: "2024-01-18T15:00:06.000000Z",
                        updated_at: "2024-01-18T15:00:06.000000Z",
                        deleted_at: null
                    }
                ],
                formAnswers: [],
                media: {
                    id: 5,
                    mediable_type: "App\\Form",
                    mediable_id: 4,
                    collection_name: "",
                    name: "cover",
                    description: null,
                    file_name: "private_content/eKhMlYT7HAbVyTkP3MMoG5tZNCGbGVFuSGAitJec.png",
                    mime_type: "image/png",
                    disk: "s3",
                    size: 2367364,
                    manipulations: "",
                    custom_properties: "",
                    responsive_images: "",
                    order_column: null,
                    created_at: "2023-07-19T11:14:35.000000Z",
                    updated_at: "2023-07-19T11:14:35.000000Z",
                    deleted_at: null,
                    temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/eKhMlYT7HAbVyTkP3MMoG5tZNCGbGVFuSGAitJec.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240220%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240220T092017Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=acbef26ac5f3bd8d6b6c94243b325a669ef108fa2c7a18c42ee901b85127cfcf",
                    thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/eKhMlYT7HAbVyTkP3MMoG5tZNCGbGVFuSGAitJec.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240220%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240220T092017Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=b015175b5fa151b1990bc4b51742d71bd30cffe79557bb24f7a404fe8dfd54b1",
                    createdDiffForHumans: "há 7 meses",
                    size_mb: 2.26
                },
                last_accepted_or_declined: {
                    id: 259,
                    user_id: 129,
                    target_type: "App\\FormProgrammation",
                    target_id: 16,
                    type: "declined",
                    value: "I don't agree with the prescribed form",
                    date: "2024-02-02 12:44:51",
                    created_at: "2024-02-02T11:44:51.000000Z",
                    updated_at: "2024-02-02T11:44:51.000000Z",
                    deleted_at: null
                }
            },
            {
                id: 17,
                form_id: 5,
                title: "Escala de medição da dor",
                description: null,
                from_date: "2024-02-20 16:00:00",
                to_date: "2024-02-23 16:00:00",
                minutes_from: null,
                minutes_to: null,
                active: 1,
                forgotten: 1,
                frequency: "daily",
                frequency_modality_asign: null,
                computed_until: null,
                computed_until_to_future: null,
                observations: "Rechazar",
                content_type: "App\\FormProgrammation",
                alarms: [],
                formProgrammationTimes: [
                    {
                        id: 17,
                        form_programmation_id: 17,
                        time: "19:00:00",
                        created_at: "2024-01-18T15:00:23.000000Z",
                        updated_at: "2024-01-18T15:00:23.000000Z",
                        deleted_at: null
                    }
                ],
                formAnswers: [],
                media: {
                    id: 3,
                    mediable_type: "App\\Form",
                    mediable_id: 5,
                    collection_name: "",
                    name: "cover",
                    description: null,
                    file_name: "private_content/ZGlAO7dOJZkPWdHhEp6dyX7Ben0NMG2TzzjiHBtN.png",
                    mime_type: "image/png",
                    disk: "s3",
                    size: 81188,
                    manipulations: "",
                    custom_properties: "",
                    responsive_images: "",
                    order_column: null,
                    created_at: "2023-07-19T11:13:26.000000Z",
                    updated_at: "2023-07-19T11:13:26.000000Z",
                    deleted_at: null,
                    temporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/ZGlAO7dOJZkPWdHhEp6dyX7Ben0NMG2TzzjiHBtN.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240220%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240220T092017Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=8a2a53a907500525b8b84cb5da041658052b577d5905a811a4e2e4183a5e6c45",
                    thumbnailTemporaryUrl: "https://doole-rosia.s3.eu-south-2.amazonaws.com/private_content/ZGlAO7dOJZkPWdHhEp6dyX7Ben0NMG2TzzjiHBtN.png?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHB3JTKOASVBSXXA%2F20240220%2Feu-south-2%2Fs3%2Faws4_request&X-Amz-Date=20240220T092017Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=b65aa6eb024c35d1fef3f4096efd6955c99a94843d98c5b08126de2795231507",
                    createdDiffForHumans: "há 7 meses",
                    size_mb: 0.08
                },
                last_accepted_or_declined: {
                    id: 254,
                    user_id: 129,
                    target_type: "App\\FormProgrammation",
                    target_id: 17,
                    type: "accepted",
                    value: null,
                    date: "2024-02-02 12:08:30",
                    created_at: "2024-02-02T11:08:30.000000Z",
                    updated_at: "2024-02-02T11:08:30.000000Z",
                    deleted_at: null
                }
            }
        ]
    })
        }
        
    
    }
}

export const fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};