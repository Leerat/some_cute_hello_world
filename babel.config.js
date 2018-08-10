const presets = [
  ["@babel/env", {
    targets: {
      browsers: "last 2 versions"
    },
    useBuiltIns: "usage",
    loose: true,
    modules: false,
  }],
  "@babel/preset-react"
]

const plugins = [
  "@babel/plugin-proposal-optional-chaining",
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  "react-hot-loader/babel"
]

module.exports = { presets, plugins }
