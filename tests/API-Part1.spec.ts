import { test, expect, request } from "@playwright/test";

const url = "https://restful-booker.herokuapp.com/booking";

test("Level 1 - Get a list of all bookings", async ({ request }) => {
  const response = await request.get(url);

  expect(response.status()).toBe(200);
  const body = await response.json();
  for (const item of body) {
    expect(item).toHaveProperty("bookingid");
  }
});

test("Level 1 - Get a specific booking", async ({ request }) => {
  const getAllBookingsresponse = await request.get(url);
  const allBookingsBody = await getAllBookingsresponse.json();
  const id = allBookingsBody[0].bookingid;

  const getBookingResponse = await request.get(`${url}/${id}`);
  expect(getBookingResponse.status()).toBe(200);
  const bookingBody = await getBookingResponse.json();
  console.log(bookingBody);
  expect(getBookingResponse.status()).toBe(200);
  expect(bookingBody).toHaveProperty("firstname");
  expect(bookingBody).toHaveProperty("lastname");
  expect(bookingBody).toHaveProperty("totalprice");
  expect(bookingBody).toHaveProperty("depositpaid");
  expect(bookingBody).toHaveProperty("bookingdates");
  expect(bookingBody.bookingdates).toHaveProperty("checkin");
  expect(bookingBody.bookingdates).toHaveProperty("checkout");
  expect(bookingBody).toHaveProperty("additionalneeds");

  //level 4: Access a booking with invalid value
  const getBookingResponseWithInvalidId = await request.get(`${url}/9283492`);
  const errorMessage = await getBookingResponseWithInvalidId.text();
  expect(getBookingResponseWithInvalidId.status()).toBe(404);
  expect(errorMessage).toContain("Not Found");
});

test("Search booking by firstname/lastname", async ({ request }) => {
  const getAllBookingsresponse = await request.get(url);
  const allBookingsBody = await getAllBookingsresponse.json();
  const id = allBookingsBody[0].bookingid;

  const getBookingResponse = await request.get(`${url}/${id}`);
  const bookingBody = await getBookingResponse.json();
  console.log(bookingBody);
  const firstName = bookingBody.firstname;
  const lastName = bookingBody.lastname;
  console.log(firstName);
  console.log(lastName);

  const getSearchReponse = await request.get(
    `${url}?firstname=${firstName}&lastname=${lastName}`
  );
  expect(getSearchReponse.status()).toBe(200);
});

test("Level 4 - Create bookinf with missing field", async ({ request }) => {
  const response = await request.post(`${url}/booking`, {
    data: {
      firstname: "Anh",
      totalprice: 999,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-01-01",
        checkout: "2025-01-02",
      },
      additionalneeds: "Breakfast",
    },
  });

  expect(response.status()).toBe(404);
});
