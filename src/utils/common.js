/**
 * 获取选择的城市
 */
export const getCity = (citys, defaultText = '地点') => {
  let nowplace = ''
  let province = citys[0]
  let city = citys[1]
  let area = citys[2]
  if (citys[2] == '全部') {
    area = 0
    if (citys[1] == '全部') {
      city = 0
      if (citys[0] == '全部') {
        province = 0
        nowplace = defaultText
      } else {
        nowplace = citys[0]
      }
    } else {
      nowplace = citys[1]
    }
  } else {
    nowplace = citys[2]
  }
  return { nowplace, province, city, area }
}
