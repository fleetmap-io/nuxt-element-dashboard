const colorArray = ['#219FD7', '#3D993D', '#F9B218', '#ff0022',
  '#979797', '#F8F9FE', '#ff7700']
export default (context, inject) => {
  inject('color', id => colorArray[id % colorArray.length])
  inject('colors', colorArray)
}
