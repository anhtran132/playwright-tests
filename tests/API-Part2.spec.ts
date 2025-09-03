import { test, expect, request } from "@playwright/test";

const url: string = "https://restful-booker.herokuapp.com";
const userame: string = "admin";
const password: string = "password123";
let bookingId: string;
let token: string;
test.describe.serial("Booking API", () => {
  test("Level 2 - create a new booking and check response", async ({
    request,
  }) => {
    const response = await request.post(`${url}/booking`, {
      data: {
        firstname: "Anh",
        lastname: "Ngoc",
        totalprice: 999,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-02",
        },
        additionalneeds: "Breakfast",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      bookingid: expect.any(Number),
      booking: {
        firstname: "Anh",
        lastname: "Ngoc",
        totalprice: 999,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-01-01",
          checkout: "2025-01-02",
        },
        additionalneeds: "Breakfast",
      },
    });

    bookingId = body.bookingid;
    console.log("bookingId = " + bookingId);
  });

  test("Level 2 - create an auth token", async ({ request }) => {
    const response = await request.post(`${url}/auth`, {
      data: {
        username: userame,
        password: password,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    token = body.token;
    console.log("token = " + token);
  });

  test("Level 3 - Update a booking using PUT", async ({ request }) => {
    const updateResponse = await request.put(`${url}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      data: {
        firstname: "James",
        lastname: "Brown",
        totalprice: 222,
        depositpaid: false,
        bookingdates: {
          checkin: "2019-01-01",
          checkout: "2020-01-01",
        },
        additionalneeds: "Lunch",
      },
    });
    expect(updateResponse.status()).toBe(200);

    const body = await updateResponse.json();
    expect(body).toMatchObject({
      firstname: "James",
      lastname: "Brown",
      totalprice: 222,
      depositpaid: false,
      bookingdates: {
        checkin: "2019-01-01",
        checkout: "2020-01-01",
      },
      additionalneeds: "Lunch",
    });
  });

  test("Level 3 - Update partially a booking using PATCH", async ({
    request,
  }) => {
    const updateResponse = await request.patch(`${url}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
      },
      data: {
        firstname: "John",
      },
    });
    expect(updateResponse.status()).toBe(200);
    const body = await updateResponse.json();
    expect(body).toMatchObject({
      firstname: "John",
      lastname: "Brown",
      totalprice: 222,
      depositpaid: false,
      bookingdates: {
        checkin: "2019-01-01",
        checkout: "2020-01-01",
      },
      additionalneeds: "Lunch",
    });
  });
  test("Level 4 - Delete without authen", async ({ request }) => {
    const deleteResponse = await request.delete(`${url}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(deleteResponse.status()).toBe(403);
  });
  test("Level 3 - Delete a booking", async ({ request }) => {
    const deleteResponse = await request.delete(`${url}/booking/${bookingId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`${url}/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});
