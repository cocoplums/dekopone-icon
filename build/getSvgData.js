const fs = require('fs');
const path = require('path');

const svgDataFlat = [];

function getCamelString(name) {
  return `Icon${name
    .replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase())
    .replace(/^./, (g) => g.toUpperCase())}`;
}

const rootPath = path.resolve(__dirname, '../src/_svgs', "general");
if (fs.lstatSync(rootPath).isDirectory()) {
    const dir = fs.readdirSync(path.resolve(rootPath));
    const dirData = {};
    const dirDataPure = {};
    dir.forEach((d) => {
        const files = fs.readdirSync(path.resolve(rootPath, d));
        function setDirData(dd, pure) {
            dd[d] = files
                .map((file) => {
                    if (file === '.DS_Store') {
                        return '';
                    }
                    const name = file.slice(0, -4);
                    const data = {
                        name,
                        componentName: getCamelString(name),
                        file: path.resolve(rootPath, d, file),
                    };
                    if (pure) {
                        delete data.name;
                        delete data.file;
                    }
                    if (!pure) {
                        svgDataFlat.push(data);
                    }
                    return data;
                })
                .filter((x) => x);
            return dd[d];
        }
        setDirData(dirData);
        setDirData(dirDataPure, true);
    });
}
module.exports = { svgDataFlat };
