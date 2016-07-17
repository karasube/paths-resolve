# paths-resolve
A simple function with no extra dependencies to recursively walk through a directory and sub-directories.
It returns an array of absolute paths to files.

Useful for bootstrapping.

`npm install --save paths-resolve`

## Usage:

```javascript
const pathsResolve = require('paths-resolve');

let files = pathsResolve(__dirname, { extensions: ['.js', '.json'], exclude: ['index.js', 'package.json'] });

console.log(files);
```

output something like:
```javascript
[
  '/var/projects/my-project/file.js',
  '/var/projects/my-project/my-subdir/file.json',
  '/var/projects/my-project/my-subdir/file.js'
]
```

## Options:
`extensions: []` allowed extensions (.js, .json, .whatever, ...)

`exclude: []` exclude files (index.js, something.json, etc...)

`onFound: (absolutePath) => absolutePath` act on value **before** it is pushed and returned. ***Always*** return or you'll get undefined.
