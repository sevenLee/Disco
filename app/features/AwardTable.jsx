import React from 'react'
import { Table } from 'react-bootstrap';


const AwardTable = (props) => (
    <div className="tab-content-scroll">
        <h5 ><b>缤纷春季擂台奖金列表</b></h5>
        <h5 ><b>3月28日</b></h5>
        <Table >
            <thead>
            <tr>
                <th colSpan={2} >排行榜</th>
                <th >奖金</th>
            </tr>
            </thead>
            <tbody >
            <tr>
                <td>1</td>
                <td>到&nbsp;1</td>
                <td>80,000 CNY</td>
            </tr>
            <tr>
                <td>2</td>
                <td>到&nbsp;11</td>
                <td>15,000 CNY</td>
            </tr>
            <tr>
                <td>12</td>
                <td>到&nbsp;100</td>
                <td>3,000 CNY</td>
            </tr>
            </tbody>
        </Table>
            <h5><b>每日排行榜</b></h5>
            <h5><b>3月21日 08:00 - 3月28日 08:00</b></h5>
            <Table >
                <thead>
                <tr>
                    <th colSpan={2} >排行榜</th>
                    <th >得分</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>到&nbsp;1</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>到&nbsp;20</td>
                    <td>250</td>
                </tr>
                <tr>
                    <td>21</td>
                    <td>到&nbsp;50</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>51</td>
                    <td>到&nbsp;100</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>101</td>
                    <td>到&nbsp;1000</td>
                    <td>10</td>
                </tr>
                </tbody>
            </Table>
            <h5 ><b>声明:</b></h5>
            <p>接近擂台赛结束时间的注单数据会花一些时间陆续写入到我方的数据库, 系统将根据最终数据统计计算排名, 所以擂台赛的排名有可能在擂台赛结束后和最终结果有些出入, 请以我方最后公告的赢家”别名”为唯一依据.谢谢理解。</p>
    </div>
)

export default AwardTable