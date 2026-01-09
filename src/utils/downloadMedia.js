/**
 * Downloads media (photo, video, gif) to user's device
 * @param {string} url - The media URL
 * @param {string} filename - The desired filename
 * @param {string} type - The media type (photo, video, gif)
 */
export const downloadMedia = async (url, filename, type) => {
  try {
    // Fetch the media file
    const response = await fetch(url, {
      mode: 'cors', // Handle CORS
    });

    if (!response.ok) {
      throw new Error('Failed to fetch media');
    }

    // Convert response to blob
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = blobUrl;
    
    // Set filename with appropriate extension
    const extension = type === 'video' ? 'mp4' : type === 'gif' ? 'gif' : 'jpg';
    link.download = `${filename || 'download'}.${extension}`;

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the blob URL
    window.URL.revokeObjectURL(blobUrl);

    return { success: true };
  } catch (error) {
    console.error('Download failed:', error);
    return { success: false, error: error.message };
  }
};