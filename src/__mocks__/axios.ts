// src/__mocks__/axios.ts
import { jest } from "@jest/globals";

const mockAxios: any = jest.createMockFromModule("axios");

mockAxios.create = jest.fn(() => mockAxios);
mockAxios.post = jest.fn();

export default mockAxios;
