//@ts-ignore
import Mock from "mockjs"

const Random = Mock.Random

function getEchartsData() {
    const data = Mock.mock({
        usernum: Random.natural(0, 999999),
        rate: Number(Math.random().toFixed(3)),
        man() {
            return Random.natural(0, this.usernum)
        },
        woman() {
            return this.usernum - this.man
        },
        ageRate: {
            child: Random.natural(100, 1000),
            young: Random.natural(100, 1000),
            prime: Random.natural(100, 1000),
            midlife: Random.natural(100, 1000),
            elderly: Random.natural(100, 1000)
        },
        mapData: [
            {
                name: "北京市",
                value: Random.natural(100, 1000)
            },
            {
                name: "天津市",
                value: Random.natural(100, 1000)
            },
            {
                name: "河北省",
                value: Random.natural(100, 1000)
            },
            {
                name: "山西省",
                value: Random.natural(100, 1000)
            },
            {
                name: "内蒙古自治区",
                value: Random.natural(100, 1000)
            },
            {
                name: "辽宁省",
                value: Random.natural(100, 1000)
            },
            {
                name: "吉林省",
                value: Random.natural(100, 1000)
            },
            {
                name: "黑龙江省",
                value: Random.natural(100, 1000)
            },
            {
                name: "上海市",
                value: Random.natural(100, 1000)
            },
            {
                name: "江苏省",
                value: Random.natural(100, 1000)
            },
            {
                name: "浙江省",
                value: Random.natural(100, 1000)
            },
            {
                name: "安徽省",
                value: Random.natural(100, 1000)
            },
            {
                name: "福建省",
                value: Random.natural(100, 1000)
            },
            {
                name: "江西省",
                value: Random.natural(100, 1000)
            },
            {
                name: "山东省",
                value: Random.natural(100, 1000)
            },
            {
                name: "河南省",
                value: Random.natural(100, 1000)
            },
            {
                name: "湖北省",
                value: Random.natural(100, 1000)
            },
            {
                name: "湖南省",
                value: Random.natural(100, 1000)
            },
            {
                name: "广东省",
                value: Random.natural(100, 1000)
            },
            {
                name: "广西壮族自治区",
                value: Random.natural(100, 1000)
            },
            {
                name: "海南省",
                value: Random.natural(100, 1000)
            },
            {
                name: "重庆市",
                value: Random.natural(100, 1000)
            },
            {
                name: "四川省",
                value: Random.natural(100, 1000)
            },
            {
                name: "贵州省",
                value: Random.natural(100, 1000)
            },
            {
                name: "云南省",
                value: Random.natural(100, 1000)
            },
            {
                name: "西藏自治区",
                value: Random.natural(100, 1000)
            },
            {
                name: "陕西省",
                value: Random.natural(100, 1000)
            },
            {
                name: "甘肃省",
                value: Random.natural(100, 1000)
            },
            {
                name: "青海省",
                value: Random.natural(100, 1000)
            },
            {
                name: "宁夏回族自治区",
                value: Random.natural(100, 1000)
            },
            {
                name: "新疆维吾尔自治区",
                value: Random.natural(100, 1000)
            },
            {
                name: "台湾省",
                value: Random.natural(100, 1000)
            },
            {
                name: "香港特别行政区",
                value: Random.natural(100, 1000)
            },
            {
                name: "澳门特别行政区",
                value: Random.natural(100, 1000)
            }
        ],
        weekData() {
            const arr = []
            for (let i = 0; i < 7; i++) {
                arr.push(Random.natural(100, 1000))
            }
            return arr
        }
    })
    return {
        code: 200,
        message: "OK",
        data
    }
}

export default {
    getEchartsData
}