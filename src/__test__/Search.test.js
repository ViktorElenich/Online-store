import { createMemoryHistory } from 'history';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Search from '../components/Search/Search';
import '@testing-library/jest-dom';

const onChange = jest.fn();

describe('Search', () => {
  it('use query param search', () => {
    const history = createMemoryHistory({ initialEntries: ['&search='] });
    const { getByTestId, getByRole } = render(
      <BrowserRouter history={history}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Search onChange={onChange} value='' />
        </QueryParamProvider>
      </BrowserRouter>,
    );
    expect(getByTestId('input_search')).toBeInTheDocument();
    fireEvent.change(getByRole('searchbox'), { target: { value: '' } });
    expect(history.location.search).toEqual('');
  });
});
