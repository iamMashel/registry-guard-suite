import { screen, waitFor } from '@testing-library/react';
import { ImageTable } from './ImageTable';
import { renderWithProviders } from '../../test-utils';
import { describe, it, expect, vi } from 'vitest';
import * as api from '../../services/api';
import type { DockerImage } from '../../data/mocks';
import userEvent from '@testing-library/user-event';

// Mock the API module
vi.mock('../../services/api', async () => {
  const actual = await vi.importActual('../../services/api');
  return {
    ...actual,
    fetchImages: vi.fn(),
  };
});

describe('ImageTable', () => {
  it('shows loading state initially', () => {
    vi.mocked(api.fetchImages).mockReturnValue(new Promise(() => { }));

    renderWithProviders(<ImageTable />);
    // Check for skeleton loader by class (glass-card exists in loading state too, but let's check for specific loading structure)
    // In the component: <div className="glass-card p-6 animate-pulse">
    const loadingCard = document.querySelector('.animate-pulse');
    expect(loadingCard).toBeInTheDocument();
  });

  it('displays fetched images', async () => {
    const mockImages: DockerImage[] = [
      {
        id: '1',
        tag: 'registry-guard:latest',
        status: 'passed',
        buildDate: '2024-03-20T10:00:00Z',
        rowCount: 100,
        sha256: 'sha256:1234567890abcdef',
        size: '50 MB',
        labels: {}
      }
    ];

    vi.mocked(api.fetchImages).mockResolvedValue(mockImages);

    renderWithProviders(<ImageTable />);

    await waitFor(() => {
      expect(screen.getByText('registry-guard:latest')).toBeInTheDocument();
      expect(screen.getByText(/Passed/i)).toBeInTheDocument();
    });
  });

  it('filters images based on search', async () => {
    const user = userEvent.setup();
    const mockImages: DockerImage[] = [
      { id: '1', tag: 'foo:latest', status: 'passed', buildDate: '2024-01-01T00:00:00Z', rowCount: 0, sha256: 'abc', size: '10MB', labels: {} },
      { id: '2', tag: 'bar:latest', status: 'passed', buildDate: '2024-01-01T00:00:00Z', rowCount: 0, sha256: 'def', size: '10MB', labels: {} }
    ];

    vi.mocked(api.fetchImages).mockResolvedValue(mockImages);

    renderWithProviders(<ImageTable />);

    await waitFor(() => {
      expect(screen.getByText('foo:latest')).toBeInTheDocument();
      expect(screen.getByText('bar:latest')).toBeInTheDocument();
    });

    // Type into search
    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'foo');

    await waitFor(() => {
      expect(screen.getByText('foo:latest')).toBeInTheDocument();
      expect(screen.queryByText('bar:latest')).not.toBeInTheDocument();
    });
  });
});
