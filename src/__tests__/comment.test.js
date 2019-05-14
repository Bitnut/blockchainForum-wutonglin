import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import Comment from '../components/Card/Comment/comment'; 

const props = {
    comment: {
        time_string: 1555823380431,
        format_time: '2019-04-21 13:09',
        user_avatar: 'http://localhost:8889/hpc/1.jpeg',
        user_name: 'hpc',
        floor: 2,
        replyList: []
    },
    onSubmit: jest.fn(),
    comment_id: 1,
    userInfo: {}
}

it('render 404 unit', () => {
  const div = document.createElement('div');
  ReactDOM.render(
                <Router>
                <Comment {...props}/>
                </Router>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
