const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const path = require('path');

(async () => {
  const files = await imagemin(['public/images/*.{jpg,png}'], {
    destination: 'public/images/optimized',
    plugins: [
      webp({
        quality: 75,
        resize: {
          width: 1920,
          height: 1080,
          fit: 'inside'
        }
      })
    ]
  });

  console.log('Images optimized:', files.map(f => path.basename(f.destinationPath)).join('\n'));
})();
