import { createImage } from './utils';

export default async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  console.log(imageSrc,'src of  image');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      // Create a new file from the blob with a proper filename
      const file = new File([blob], 'cropped_image.jpg', { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
}
