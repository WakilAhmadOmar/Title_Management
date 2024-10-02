// src/__mocks__/axios.ts
import { jest } from "@jest/globals";
import axios from "axios";

const mockAxios: any = jest.createMockFromModule("axios");

mockAxios.create = jest.fn(() => mockAxios);
mockAxios.post = jest.fn();

export default mockAxios;
