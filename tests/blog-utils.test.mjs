import { test } from "node:test";
import assert from "node:assert/strict";
import { readingTime } from "../blog-utils.mjs";

const words = (n) => Array.from({ length: n }, () => "mot").join(" ");

test("readingTime: empty text is 1 minute", () => assert.equal(readingTime(""), 1));
test("readingTime: 1 word is 1 minute", () => assert.equal(readingTime("mot"), 1));
test("readingTime: 200 words is 1 minute", () => assert.equal(readingTime(words(200)), 1));
test("readingTime: 201 words is 2 minutes", () => assert.equal(readingTime(words(201)), 2));
test("readingTime: 1000 words is 5 minutes", () => assert.equal(readingTime(words(1000)), 5));
test("readingTime: paragraph breaks do not count as words", () => assert.equal(readingTime("a\n\nb"), 1));
test("readingTime: null-ish input is 1 minute", () => assert.equal(readingTime(undefined), 1));
