import { getColor } from './apiMock';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getColors(colors, callback) {
  const colorArray = [];
  colors.forEach((color) => {
    colorArray.push(getColor(color));
  });
  callback(colorArray);
  return colorArray;
}

const colors = () => {
  let uniqueArgs = [];
  rl.question('What colors would you like?', (colors) => {
    rl.question('What order should the colors be displayed?', (order) => {
      const colorArguments = colors.split(' ');
      uniqueArgs = [...new Set(colorArguments)];
      let orderArguments = [];
      if (order) {
        orderArguments = order.split(' ');
        uniqueArgs.sort((a, b) => (orderArguments.indexOf(a) - orderArguments.indexOf(b)));
      }

      getColors(uniqueArgs, async (colors) => {
        const returnedColors = await Promise.all(colors);
        returnedColors.forEach((color) => {
          console.log(`${color.name} - HEX: ${color.HEX} RBG: R:${color.RGB.R} G:${color.RGB.G} B:${color.RGB.B}`);
        });
      });
    });
  });
};

colors();
