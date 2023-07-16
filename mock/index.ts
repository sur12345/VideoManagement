//@ts-ignore
import Mock from "mockjs"
import EchartsData from "./MockData/echartsData"

Mock.mock(/\/mock\/getEchartsData/, "get", EchartsData.getEchartsData)