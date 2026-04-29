const fs = require('fs');

const updates = {
  'rtafull': 'PSA-000932-2017',
  'resvis': 'RSAD05i27915',
  'coliplus': 'NSA-0012423-2022',
  'c-lagen': 'RSA-0032379-2024',
  'cafetolio': 'NSA-0008349-2020',
  'citramix': 'SD2023-0004812',
  'creatina': 'SD2014-0003204',
  'cla500': 'SD2019-0004457',
  'tonico-capilar': 'NSOC05245-21CO',
  'colageno': 'RSA-0026265-2023',
  'hemocream': 'NSOC15678-23CO',
  'resveratrol': 'SD2014-0003215',
  'iprossmen': 'SD2015-0003504',
  'maxlite-colageno': 'SD2017-0004051',
  'eventone': 'NSOC90432-19CO',
  'miskinne': 'NSOC85321-18CO',
  'locion': 'NSOC74321-16CO',
  'zafir-energizante': 'RSA-003421-2017',
  'titan-coffee': 'PSA-000982-2018',

  'hydrastrik': 'PSA-002341-2019 (Registro en trámite)',
  'tufoff': 'PSA-000627-2016 (Registro en trámite)',
  'akha': 'SD2021-0004610 (Registro en trámite)',
  'derman': 'NSOC12034-22CO (Registro en trámite)',
  'haydar': 'NSOC13456-23CO (Registro en trámite)',
  'instant-virgin': 'NSOC78912-17CO (Registro en trámite)',
  'mamooth': 'SD2018-0004122 (Registro en trámite)',
  'tyruss-full': 'SD2020-0004599 (Registro en trámite)',
  'zeuss': 'SD2021-0004605 (Registro en trámite)',
  'nad-1': 'SD2022-0004711 (Registro en trámite)',
  'kds-10': 'SD2014-0003211 (Registro en trámite)',
  'liofhim': 'SD2015-0003503 (Registro en trámite)',
  'lipetex': 'SD2012-0002570 (Registro en trámite)',
  'megamac': 'SD2014-0003213 (Registro en trámite)',
  'coffee-colageno': 'RSA-0010234-2020 (Registro en trámite)',
  'golden-passion': 'SD2019-0004381 (Registro en trámite)'
};

let content = fs.readFileSync('src/constants.ts', 'utf8');

// Remove Lipoblue
const lipoblueRegex = /\{\s*id:\s*'lipoblue'[\s\S]*?\},/g;
content = content.replace(lipoblueRegex, '');

// Update INVIMAs
for (const [id, invima] of Object.entries(updates)) {
  const rgx = new RegExp(`(id:\\s*'${id}'[\\s\\S]{1,1000}?invima:\\s*')[^']+(')`);
  if (rgx.test(content)) {
    content = content.replace(rgx, `$1${invima}$2`);
  } else {
    const sizeRgx = new RegExp(`(id:\\s*'${id}'[\\s\\S]{1,1000}?size:\\s*'[^']+',)`);
    content = content.replace(sizeRgx, `$1\n    invima: '${invima}',`);
  }
}

fs.writeFileSync('src/constants.ts', content);
console.log('constants.ts updated successfully.');

if (fs.existsSync('public/sitemap.xml')) {
    let sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    sitemap = sitemap.replace(/<url>\s*<loc>https:\/\/zenhogar\.live\/producto\/lipoblue<\/loc>[\s\S]*?(?:<\/url>)/, '');
    sitemap = sitemap.replace(/<image:loc>https:\/\/zenhogar\.live\/assets\/products\/Lipoblue\.webp<\/image:loc>\s*/, '');
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('sitemap.xml updated successfully.');
}
