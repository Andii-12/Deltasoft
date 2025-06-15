const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const compressImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath)
      .resize(1200, 1200, { // Max dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 }) // Compress JPEG
      .toFile(outputPath);
    console.log(`Compressed: ${inputPath}`);
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error);
  }
};

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '_compressed.jpg');
      await compressImage(filePath, outputPath);
      // Replace original with compressed version
      fs.unlinkSync(filePath);
      fs.renameSync(outputPath, filePath);
    }
  }
};

// Process public/images directory
processDirectory(path.join(__dirname, '../public/images'))
  .then(() => console.log('Image compression completed'))
  .catch(console.error); 