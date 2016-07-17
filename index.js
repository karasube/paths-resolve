const fs = require('fs');
const path = require('path');

/**
 * A function to recursively walk through a directory and return every absolute
 * paths inside.
 * Good for bootstrapping an application.
 *
 * @function
 * @name pathsResolve
 * @param {String} directory Absolute or relative path to start crawling.
 * @param {Object} Configuration object (Comparaison is 1=1 or firstLetter=1)
 * @param {Array} [container=[]] A list of files to keep populate.
 *
 * @return {Array} Absolute paths of resolved files in directory.
 *
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_readdirsync_path_options}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_statsync_path}
 * @see {@link https://nodejs.org/api/path.html#path_path_resolve_path}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes}
 * @see {@link https://en.wikipedia.org/wiki/Recursion_(computer_science)}
 */
function pathsResolve(directory, opts, container) {
  opts = opts || {};

  let omits = opts.exclude || [];
  let allowedExtensions = opts.extensions || [];
  let files = container || [];
  let excludeDotFiles = opts.excludeDotFiles || true;

  let filesFound = fs.readdirSync(directory);

  for (let i = 0, count = filesFound.length; i < count; i++) {
    let file = filesFound[i];
    let absolutePath = path.resolve(directory, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      files = pathsResolve(absolutePath, opts, files);
    } else if ((excludeDotFiles && file[0] === '.') || omits.includes(file) || !allowedExtensions.includes(path.extname(file))) {
      continue;
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

module.exports = pathsResolve;
