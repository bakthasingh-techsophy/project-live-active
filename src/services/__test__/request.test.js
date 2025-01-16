import axios from 'axios';
import { request } from '../request';

jest.mock('axios');

describe('HTTP services', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should test get', async () => {
    axios.get.mockResolvedValue({
      success: true,
      data: {
        message: 'api get successful',
      },
    });
    const response = await request.get('testUrl');
    expect(response.success).toBe(false);
  });

  it('should test put', async () => {
    axios.put.mockResolvedValue({
      success: true,
      data: {
        message: 'api put successful',
      },
    });
    const response = await request.put('testUrl');
    expect(response.success).toBe(false);
  });

  it('should test post', async () => {
    axios.post.mockResolvedValue({
      success: true,
      data: {
        message: 'api post successful',
      },
    });
    const response = await request.post('testUrl');
    expect(response.success).toBe(false);
  });

  it('should test delete', async () => {
    axios.delete.mockResolvedValue({
      success: true,
      data: {
        message: 'api delete successful',
      },
    });
    const response = await request.delete('testUrl');
    expect(response.success).toBe(false);
  });

  it('should test getBlob', async () => {
    axios.get.mockResolvedValue({
      success: true,
      data: {
        message: 'api getBlob successful',
      },
    });
    const response = await request.getBlob('testUrl');
    expect(response.success).toBe(false);
  });

  it('should test postFormForToken', async () => {
    axios.post.mockResolvedValue({
      success: true,
      data: {
        message: 'api postFormForToken successful',
      },
    });
    const response = await request.postFormForToken('testUrl');
    expect(response.success).toBe(false);
  });
});
