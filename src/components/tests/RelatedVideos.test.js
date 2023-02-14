import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeVideos } from '../../tests/video';
import RelatedVideos from '../RelatedVideos';

describe('Related Videos', () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  function renderRelatedVideosWithCallback(callback) {
    fakeYoutube.relatedVideos.mockImplementation(callback);
    return render(
      withAllContexts(
        withRouter(<Route path='/' element={<RelatedVideos id='id' />} />),
        fakeYoutube
      )
    );
  }

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it('renders correctly', async () => {
    const { asFragment } = renderRelatedVideosWithCallback(() => fakeVideos);

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders related video correctly', async () => {
    renderRelatedVideosWithCallback(() => fakeVideos);

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith('id');

    await waitFor(() =>
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length)
    );
  });

  it('renders loading', () => {
    renderRelatedVideosWithCallback(() => fakeVideos);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error', async () => {
    renderRelatedVideosWithCallback(() => {
      throw new Error('error');
    });

    const errMsg = await screen.findByText('Something is wrong 😖');
    expect(errMsg).toBeInTheDocument();
  });
});
