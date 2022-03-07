import React from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Tab, Tabs } from 'react-bootstrap';
import communityBoradData from './jsonFile/CommunityBoradData.json';
import groupData from './jsonFile/GroupBoradData.json';

function myPageCommunityBoard(props) {
    return (
        <div id='myPageMain'>
            <Sidebar /> 
            <div id='board'>
            <Tabs>
                <Tab eventKey="group" title="모임찾기">
                    <Table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>카테고리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupData.group.map((n,index) => (
                            <tr key={index}>
                                <td>{n.no}</td>
                                <td>
                                    <Link to={'/Group/'+n.no} className='myPageLink'>
                                        {n.title}
                                    </Link>
                                </td>
                                <td>
                                    {n.category}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="communication" title="소통공간">
                    <Table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {communityBoradData.community.map((n,index) => (
                            <tr key={index}>
                                <td>{n.no}</td>
                                <td>
                                    <Link to={'/Community/'+n.no} className='myPageLink'>
                                        {n.title}
                                    </Link>
                                </td>
                                <td>
                                    {n.date}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
            </div>
        </div>
    );
}

export default myPageCommunityBoard;