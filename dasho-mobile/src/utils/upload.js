import api from './api';

/**
 * Upload a file to the backend /attachments endpoint and return the Cloudinary URL.
 * @param {{ uri: string; name?: string; type?: string }} file
 * @returns {Promise<string>} attachment_url
 */
export async function uploadAttachment(file) {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    name: file.name || 'attachment',
    type: file.type || 'application/octet-stream',
  });

  const res = await api.post('/attachments', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return (
    res?.data?.attachment_url || res?.data?.secure_url || res?.data?.url || ''
  );
}
