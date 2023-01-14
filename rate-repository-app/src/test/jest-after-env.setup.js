import "@testing-library/jest-native/extend-expect";
import { fetch } from "cross-fetch";

import { server } from "./mocks/server";

global.fetch = fetch;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
