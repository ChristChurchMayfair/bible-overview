import { expect, test } from "vitest";
import { extractPassagesFromHeading } from "../scripts/markdown-parser/study-parser";

test("Given heading with single bible reference When extracting passages Then returns single passage", () => {
  // Given
  const heading = "Read Ephesians 1:9-14";

  // When
  const result = extractPassagesFromHeading(heading);

  // Then
  expect(result).toEqual(["Ephesians 1:9-14"]);
});

test("Given heading without Read prefix When extracting passages Then returns empty array", () => {
  // Given
  const heading = "Introduction";

  // When
  const result = extractPassagesFromHeading(heading);

  // Then
  expect(result).toEqual([]);
});

test("Given different bible reference When extracting passages Then returns that passage", () => {
  // Given
  const heading = "Read Acts 13:13-39";

  // When
  const result = extractPassagesFromHeading(heading);

  // Then
  expect(result).toEqual(["Acts 13:13-39"]);
});

test("Given multiple bible references separated by semicolon When extracting passages Then returns multiple passages", () => {
  // Given
  const heading = "Read Ephesians 1:9-14; Acts 13:13-39";

  // When
  const result = extractPassagesFromHeading(heading);

  // Then
  expect(result).toEqual(["Ephesians 1:9-14", "Acts 13:13-39"]);
});

test("Arbirtrary format question section heading", () => {
  // Given
  const heading = "Genesis 1:1-3:3, 1 John 1:2"

  // when
  const result = extractPassagesFromHeading(heading)

  // Then
  expect(result).toEqual(["Genesis 1:1-3:3","1 John 1:2"])
})

test("Arbirtrary format question section heading with space separation", () => {
  // Given
  const heading = "Genesis 1:1-3:3 1 John 1:2"

  // when
  const result = extractPassagesFromHeading(heading)

  // Then
  expect(result).toEqual(["Genesis 1:1-3:3","1 John 1:2"])
})