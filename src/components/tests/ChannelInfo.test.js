import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  const name = 'channelName';

  function renderChannelInfoWithCallback(callback) {
    fakeYoutube.channelImageURL.mockImplementation(callback);
    return render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<ChannelInfo id='id' name={name} />} />
        ),
        fakeYoutube
      )
    );
  }

  afterEach(() => {
    fakeYoutube.channelImageURL.mockReset();
  });

  it('renders correctly', async () => {
    const { asFragment } = renderChannelInfoWithCallback(() => 'url');

    await waitFor(() => {
      screen.getByText(name);
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without URL', () => {
    renderChannelInfoWithCallback(() => {
      throw new Error('error');
    });

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    renderChannelInfoWithCallback(() => 'url');

    const img = await screen.findByRole('img');
    expect(img).toBeInTheDocument();
  });
});
