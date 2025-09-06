import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  try {
    const files = await imagemin(['public/images/*.{jpg,png}'], {
      destination: 'public/images/optimized',
      plugins: [
        imageminWebp({
          quality: 75
        })
      ]
    });

    console.log('Images optimized successfully!');
    console.log('Optimized files:', files.map(f => path.basename(f.destinationPath)).join('\n'));
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
})();
