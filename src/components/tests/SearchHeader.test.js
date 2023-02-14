import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../tests/utils';
import SearchHeader from '../SearchHeader';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with keyword correctly', () => {
    render(
      withRouter(<Route path='/:keyword' element={<SearchHeader />} />, '/bts')
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('navigates to results page on search button click', () => {
    const searchKeyword = 'fake-keyword';
    const result = `Search result for ${searchKeyword}`;

    render(
      withRouter(
        <>
          <Route path='/home' element={<SearchHeader />} />
          <Route path={`/videos/${searchKeyword}`} element={<p>{result}</p>} />
        </>,
        '/home'
      )
    );

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    expect(screen.getByText(result)).toBeInTheDocument();
  });
});
