const fs = require('fs');
const path = require('path');

console.log('Running post-build script...');

// Ensure carousel directory exists in build
const carouselDir = path.join(__dirname, '../build/images/carousel');
if (!fs.existsSync(carouselDir)) {
  fs.mkdirSync(carouselDir, { recursive: true });
  console.log('Created carousel directory in build');
}

// Copy carousel images
const publicCarouselDir = path.join(__dirname, '../public/images/carousel');
const buildCarouselDir = path.join(__dirname, '../build/images/carousel');

if (fs.existsSync(publicCarouselDir)) {
  const files = fs.readdirSync(publicCarouselDir);
  files.forEach(file => {
    if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
      const srcPath = path.join(publicCarouselDir, file);
      const destPath = path.join(buildCarouselDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file} to build directory`);
    }
  });
}

// Ensure favicon files exist
const faviconFiles = ['favicon.ico', 'logo192.png', 'logo512.png'];
faviconFiles.forEach(file => {
  const publicPath = path.join(__dirname, `../public/${file}`);
  const buildPath = path.join(__dirname, `../build/${file}`);
  
  if (fs.existsSync(publicPath)) {
    fs.copyFileSync(publicPath, buildPath);
    console.log(`Ensured ${file} exists in build`);
  }
});

console.log('Post-build script completed successfully!');
