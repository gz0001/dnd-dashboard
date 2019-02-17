const fs = require('fs')

// Read all css variable files:
const varPath = './src/variables/'
const fileNames = fs.readdirSync(varPath)
const varNames = fileNames.map(filename => varPath + filename)

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          importFrom: varNames,
          preserve: false,
          autoprefixer: { grid: true },
          stage: 1,
          features: {
            'color-mod-function': {
              unresolved: 'warn'
            },
            'custom-properties': {
              preserve: false
            },
            'nesting-rules': true
          }
        }),
        require('tailwindcss')('./tailwind.js'),
        require('postcss-nested')
      ]
    }
  }
}
