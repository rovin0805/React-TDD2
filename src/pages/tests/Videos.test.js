import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeVideo, fakeVideos } from '../../tests/video';
import Videos from '../Videos';

describe('Videos', () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<Videos />} />
            <Route path='/:keyword' element={<Videos />} />
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) =>
      keyword ? [fakeVideo] : fakeVideos
    );
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it('renders all videos when keyword is not specified', async () => {
    renderWithPath('/');

    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('when keyword is specified, renders search results', async () => {
    const keyword = 'fake-keyword';
    renderWithPath(`/${keyword}`);

    expect(fakeYoutube.search).toHaveBeenCalledWith(keyword);
    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(1)
    );
  });

  it('renders loading state when items are being fetched', () => {
    renderWithPath('/');

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state when fetching item fails', async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error('error');
    });

    renderWithPath('/');

    const errMsg = await screen.findByText(/Something is wrong/i);
    expect(errMsg).toBeInTheDocument();
  });
});
