import "regenerator-runtime/runtime";
import "@testing-library/jest-dom/extend-expect";
import { server } from "./src/mocks/server";

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
