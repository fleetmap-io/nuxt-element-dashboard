const colorArray = ['#219FD7', '#3D993D', '#F9B218', '#ff0022',
  '#979797', '#f46a9b', '#ff7700', '#dc0ab4',
  '#e60049', '#0bb4ff', '#50e991', '#e6d800', '#9b19f5',
  '#ffa300', '#dc0ab4', '#b3d4ff', '#00bfa0',
  '#ea5545', '#f46a9b', '#ef9b20', '#edbf33',
  '#ede15b', '#bdcf32', '#87bc45', '#27aeef', '#b33dc6'
]

export default (context, inject) => {
  inject('color', id => colorArray[id % colorArray.length])
  inject('colors', colorArray)
}
