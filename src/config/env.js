// const ENV = "test" //测试环境  
// const ENV = "development"//开发环境
const ENV = "production"//生产环境
let baseUrl = ""
switch (ENV) {
  case "test":
    baseUrl = 'http://192.168.0.145:9999/'
    break
  case "development":
    baseUrl = 'http://192.168.0.123:9999'
    break
  default:
    baseUrl = 'https://app.58mixgo.com/'
    break
}
export default baseUrl
