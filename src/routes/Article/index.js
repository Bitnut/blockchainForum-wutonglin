import React, {Component} from 'react'
import { Layout, Affix, Button, Avatar, Tooltip} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchPostById, solveLike, solveCollect} from '../../redux/actions/posts'
import CommentApp from '../../components/Card/Comment/commentApp'
//import Picker from '../../components/Picker'
import './index.css';
import { redBright } from 'ansi-colors';
import collect from '../../assets/collect.png'
import nullCollect from '../../assets/nullCollect.png'
import like from '../../assets/like.png'
import nullLike from '../../assets/nullLike.png'
import share from '../../assets/share.png'
import energy from '../../assets/energy.png'
import {FormatTime} from '../../components/utils/formatTime'
//import http from '../../services/server';
const { Content} = Layout;


class readArticle extends Component{
    state = {
        newContent: '',
    }; 
    static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
    }
    componentDidMount() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        const data = {
            post_id: this.props.match.params.id,
            user_id: userInfo.user_id
        }
        this.props.dispatch(fetchPostById(data))
    }
    handleCollect = () => {
        const post = this.props.readingPost[0]
        var data = {
            action: '',
            post_id: post.post_id,
            user_id: this.props.user_id,
            post_title: post.post_title,
            post_img: post.intro_img,
            created_at: FormatTime("yyyy-MM-dd hh:mm", +new Date())
        }
        console.log(this.collect, this.state.collect_img)
        if(this.props.collect_status) {
            data.action = 'cancel'
            this.props.dispatch(solveCollect(data))
        } else {
            data.action = 'add'
            this.props.dispatch(solveCollect(data))
        }
    }
    handleLike = () => {
        var data = {
            action: '',
            post_id: this.props.readingPost[0].post_id,
            user_id: this.props.user_id,
            created_at: FormatTime("yyyy-MM-dd hh:mm", +new Date())
        }
        if(this.props.like_status) {
            data.action= 'cancel'
            this.props.dispatch(solveLike(data))
        } else {
            data.action = 'add'
            this.props.dispatch(solveLike(data))
        }
        
    }
    render(){
        const { isFetching, lastUpdated } = this.props
        const isEmpty = this.props.readingPost.length === 0
        if(!this.props.fetchStatus){
            return (<Redirect to="/404" />);
        }
        return(
            <div>
            <div className="article-wrapper">
                
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    {isEmpty
                        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>) :
                        <Affix offsetTop={500} onChange={affixed => console.log(affixed)} className='button-wrapper'>
                            <Tooltip placement="right" title='收藏'>
                                <Button 
                                ghost 
                                style={{width:80, height: 80, border:false}}
                                onClick={this.handleCollect}
                                >
                                {this.props.collect_status
                                    ?<img style={{width: 40}} src={collect}></img>
                                    :<img style={{width: 40}} src={nullCollect}></img>}
                                </Button>
                            </Tooltip>
                            <Tooltip placement="right" title='喜欢'>
                                <Button 
                                ghost 
                                style={{width:80, height: 80, border:false}}
                                onClick={this.handleLike}
                                >
                                {this.props.like_status
                                    ?<img style={{width: 40}} src={like}></img>
                                    :<img style={{width: 40}} src={nullLike}></img>}
                                </Button>
                            </Tooltip>
                            <Tooltip placement="right" title='分享'>
                                <Button ghost style={{width:80, height: 80, border:false}}><img style={{width: 40}} src={share}></img></Button>
                            </Tooltip>   
                        </Affix>
                    }  
                        
                        <Content style={{ padding: '0 24px',minHeight: 300, overflow: 'hidden' }} className="article-content">
                        <div>
                            
                        <p>
                            {lastUpdated &&
                                <span>
                                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                                {' '}
                                </span>
                            }
                            </p>
                            {isEmpty
                            ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                            : <div >
                                    <div>
                                        <h1  align="center"><div dangerouslySetInnerHTML = {{ __html:this.props.readingPost[0].post_title }}></div></h1>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <div dangerouslySetInnerHTML = {{ __html:this.props.readingPost[0].post_content_html }}></div>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <div style={{marginLeft: 400}}> 
                                            <Button shape="circle" style={{width:120, height: 120, marginLeft: 70}} ref='commentarea'>
                                            <img style={{width: 100}} src={energy}></img>
                                            </Button>
                                            <br/>
                                        <br/>
                                            <p>奖励能量，支持一下作者吧～</p>
                                        </div>
                                        <br/>
                                        <br/>
                                        <br/>
                                    </div>
                                    <div >
                                        <CommentApp post_id={this.props.readingPost[0].post_id}/>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="read-text" dangerouslySetInnerHTML={{__html: this.state.newContent != null ? this.state.newContent : "本章似乎丢失了！" }}></div>
                        
                        </Content>
                    
            </Layout>       
            </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { posts } = state  
    return {
        user_id: state.user.userInfo.user_id,
        readingPost: posts.readingPost,
        isFetching: posts.isFetching,
        fetchStatus: posts.fetchStatus,
        like_status: posts.like_status,
        collect_status: posts.collect_status
    }
}


export default connect(mapStateToProps)(readArticle)