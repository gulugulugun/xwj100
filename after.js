const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const reportKey = 'mmpayfereport_demo';

console.log(process.argv);
function replaceIt (someFile) {
  fs.readFile(someFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const result = data.replace(reportKey, process.argv[3].replace('--', '').replace('/', '-'));
    fs.writeFile(someFile, result, 'utf8',
      (e) => {
        if (e) console.log(e);
      });
  });
}

function replaceDirSync (pathStr) {
  const pa = fs.readdirSync(pathStr);
  pa.forEach((ele) => {
    const info = fs.statSync(`${pathStr}/${ele}`);
    if (info.isDirectory()) {
      replaceDirSync(`${pathStr}/${ele}`);
    } else {
      const ext = path.extname(ele);
      if (ext === '.html') {
        replaceIt(`${pathStr}/${ele}`);
      }
    }
  });
}

function replaceTpl () {
  const htmlData = parse(fs.readFileSync('./public/index.html'), { comment: true });

  htmlData.querySelector('.topbar').remove();
  const header = htmlData.querySelector('.header');
  const _header = parse('<?php $this->load->view(\'en / common / header_v.shtml\'); ?>');
  header.replaceWith(_header);

  const sidebar = htmlData.querySelector('.sidebar');
  const _sidebar = parse('<?php $this->load->view(\'common / left.shtml\', $left_menu); ?>');
  sidebar.replaceWith(_sidebar);

  const footer = htmlData.querySelector('.footer');
  const _footer = parse('<?php $this->load->view(\'comm / footer_v2.html\');?>');
  footer.replaceWith(_footer);

  fs.writeFileSync('./public/index.html', htmlData.toString());
}

// replaceTpl();
replaceDirSync('./build');
