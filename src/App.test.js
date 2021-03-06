import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import {
  getOutwardPostCode,
  isValidPostCode,
  getPostCodeArray,
  getOutwardPostCodes,
  removeDuplicates,
  getTotalCount,
  getPostCodeCount,
  getPostCodePercentage,
  getFormattedData,
  getHistogramLabels,
  getHistogramData,
  getTop5Postcodes,
} from "./helpers.js";

test("renders a histogram", () => {});

test("it gets the outward code of a postcode", () => {
  // Given a postcode
  const postcode = "M4 1AB";
  const returnedValue = getOutwardPostCode(postcode);
  // We get just the outward portion of the postcode
  expect(returnedValue).toEqual("M4");
});

test("it handles correct postcodes", () => {
  // Given a postcode that is incorrectly formatted e.g using numbers, or the wrong number of characters
  const postcode = "M41 7NP";
  const returnedValue = isValidPostCode(postcode);
  // We are returned an error / a null object
  expect(returnedValue).toEqual(true);
});

test("it handles incorrect postcodes", () => {
  // Given a postcode that is incorrectly formatted e.g using numbers, or the wrong number of characters
  const postcode = "43432432$";
  const returnedValue = isValidPostCode(postcode);
  // We are returned an error / a null object
  expect(returnedValue).toEqual(false);
});

test("it extracts an array of postcodes from an array of objects", () => {
  // Given a list of postcodes
  const data = [
    {
      postcode: "ME12 1ED",
    },
    {
      postcode: "ME12 2EF",
    },
    {
      postcode: "2323432 4FG",
    },
    {
      postcode: "ME12 4FG",
    },
    {
      postcode: "ewfefe 44",
    },
    {
      postcode: "M30 5TG",
    },
    {
      postcode: "M30 4EF",
    },
    {
      postcode: "M22 5HT",
    },
    {
      postcode: "M22 1ED",
    },
  ];

  // We are returned an array of postcodes
  expect(getPostCodeArray(data)).toEqual([
    "ME12 1ED",
    "ME12 2EF",
    "ME12 4FG",
    "M30 5TG",
    "M30 4EF",
    "M22 5HT",
    "M22 1ED",
  ]);
});

test("it returns an error if list of postcodes is invalid", () => {
  // Given an invalid array
  let data = [3232];
  // We are returned an error
  expect(getPostCodeArray(data)).toBe("Sorry, that's an invalid array");
  // Given an invalid array
  data = {};
  // We are returned an error
  expect(getPostCodeArray(data)).toBe("Sorry, that's an invalid array");
  // Given an invalid array
  data = 1;
  // We are returned an error
  expect(getPostCodeArray(data)).toBe("Sorry, that's an invalid array");
  // Given an invalid array
  data = [{}];
  // We are returned an error
  expect(getPostCodeArray(data)).toBe("Sorry, that's an invalid array");
});

test("it returns an array of outward postcodes", () => {
  // Given a list of postcodes
  const data = [
    "ME12 1ED",
    "ME12 2EF",
    "ME12 4FG",
    "M30 5TG",
    "M30 4EF",
    "M22 5HT",
    "M22 1ED",
  ];

  // We are returned an array of postcodes
  expect(getOutwardPostCodes(data)).toEqual([
    "ME12",
    "ME12",
    "ME12",
    "M30",
    "M30",
    "M22",
    "M22",
  ]);
});

test("it removes duplicates", () => {
  // Given a dataset
  let data = ["ME12", "ME12", "ME12", "M30", "M30", "M22", "M22"];
  // Remove the duplicates
  expect(removeDuplicates(data).length).toBe(3);
  expect(removeDuplicates(data)).toEqual(["ME12", "M30", "M22"]);

  data = [1, 3, 3, 2, 1, 3, 45, 56, 6, 6, 5, 4, 3, 3, 2];

  expect(removeDuplicates(data).length).toBe(8);
  expect(removeDuplicates(data)).toEqual([1, 3, 2, 45, 56, 6, 5, 4]);
});

test("it gets total count of postcodes", () => {
  // Given a list of postcodes
  const data = ["ME12", "ME12", "ME12", "M30", "M30", "M22", "M22"];

  // We are returned the total count of postcodes
  expect(getTotalCount(data)).toEqual(3);
});
test("it gets a postcodes count", () => {
  // Given an array of objects with postcodes
  const data = [
    "ME12",
    "ME12",
    "ME12",
    "ME12",
    "ME12",
    "M30",
    "M30",
    "M22",
    "M22",
    "M22",
  ];
  // We are returned the number of occurrences of the postcode in the original array
  expect(getPostCodeCount(data, "ME12")).toBe(5);
  expect(getPostCodeCount(data, "M30")).toBe(2);
  expect(getPostCodeCount(data, "M22")).toBe(3);
});

test("it gets a postcodes percentage", () => {
  // Given an array of objects with postcodes
  const data = [
    "ME12",
    "ME12",
    "ME12",
    "ME12",
    "ME12",
    "M30",
    "M30",
    "M22",
    "M22",
    "M22",
  ];
  // We are returned an array of postcode objects, with the percentage of total postcode
  expect(getPostCodePercentage(data, "ME12")).toBe("50.00");
  expect(getPostCodePercentage(data, "M30")).toBe("20.00");
  expect(getPostCodePercentage(data, "M22")).toBe("30.00");
});

test("it gets a returned array of correctly formatted postcodes", () => {
  const data = [
    "ME12 1ED",
    "ME12 2EF",
    "ME12 4FG",
    "ME12 2EF",
    "ME12 4FG",
    "M30 5TG",
    "M30 4EF",
    "M30 4EF",
    "M22 5HT",
    "M22 1ED",
  ];

  expect(getFormattedData(data)).toEqual([
    {
      postcode: "ME12",
      count: 5,
      percentage: "50.00",
    },
    {
      postcode: "M30",
      count: 3,
      percentage: "30.00",
    },
    {
      postcode: "M22",
      count: 2,
      percentage: "20.00",
    },
  ]);
});

test("it gets labels for histogram", () => {
  const data = [
    {
      postcode: "ME12",
      count: 5,
      percentage: 50,
    },
    {
      postcode: "M30",
      count: 3,
      percentage: 30,
    },
    {
      postcode: "M22",
      count: 2,
      percentage: 20,
    },
  ];
  expect(getHistogramLabels(data).length).toBe(3);

  expect(getHistogramLabels(data)).toEqual([
    "ME12 (50%)",
    "M30 (30%)",
    "M22 (20%)",
  ]);
});
test("it gets data for histogram", () => {
  const data = [
    {
      postcode: "ME12",
      count: 5,
      percentage: "50.00",
    },
    {
      postcode: "M30",
      count: 3,
      percentage: "30.00",
    },
    {
      postcode: "M22",
      count: 2,
      percentage: "20.00",
    },
  ];
  expect(getHistogramData(data).length).toBe(3);

  expect(getHistogramData(data)).toEqual([5, 3, 2]);
});

test("it produces a list of top 5 postcodes", () => {
  // Given an array of postcodes with counts
  const data = [
    {
      postcode: "ME12",
      count: 100,
    },
    {
      postcode: "M30",
      count: 95,
    },
    {
      postcode: "M22",
      count: 86,
    },
    {
      postcode: "M4",
      count: 78,
    },
    {
      postcode: "M2",
      count: 6,
    },
    {
      postcode: "MK12",
      count: 5,
    },
    {
      postcode: "M32",
      count: 7,
    },
    {
      postcode: "M33",
      count: 3,
    },
    {
      postcode: "M1",
      count: 2,
    },
  ];
  expect(getTop5Postcodes(data).length).toBe(5);

  expect(getTop5Postcodes(data)).toEqual([
    {
      postcode: "ME12",
      count: 100,
    },
    {
      postcode: "M30",
      count: 95,
    },
    {
      postcode: "M22",
      count: 86,
    },
    {
      postcode: "M4",
      count: 78,
    },
    {
      postcode: "M32",
      count: 7,
    },
  ]);
});
