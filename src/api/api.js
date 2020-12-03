

export const getAxios = (datas, page) => {
  return new Promise((reolve, reject) => {
    setTimeout(() => {
      let data = {
        list: [
          {
            name: '小明',
            age: 18,
            gender: 0,
            data: datas.page
          },
          {
            name: '小兰',
            age: 20,
            gender: 1,
            data: datas.page
          },
          {
            name: '韩孝周',
            age: 20,
            gender: 1,
            data: datas.page
          }
        ],
        total: 100,
      }
      reolve(data)
    }, 1500);
  })
}