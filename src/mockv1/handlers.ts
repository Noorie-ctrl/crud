import {http, HttpResponse} from "msw"

export const handlers = [
http.get("/api/users", () => {
return HttpResponse.json([
{id:1, name:"Haleemah"},
{id:2, name: "Ashabi"},
],
{ status:200 },
)
})
];
