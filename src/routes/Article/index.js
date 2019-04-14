import React, {Component} from 'react'
import { Layout} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostById} from '../../redux/actions/posts'
//import Picker from '../../components/Picker'
import './index.css';

//import http from '../../services/server';
const { Content} = Layout;


class readArticle extends Component{
    state = {
        newContent: ''
      }; 
    static propTypes = {
    selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
    }
    /*componentDidMount() {
      const result = http.post('/auth/article/1')
      result.then((res) => {
        if (res.data.success) {
          this.setState({newContent: res.data.articleData});
        } else {
        }
      },(err) => {
        console.log(err)
      })
    }*/
    componentDidMount() {
        this.props.dispatch(fetchPostById(this.props.match.params.id))
    }

    render(){
        const { isFetching, lastUpdated } = this.props
        const isEmpty = this.props.readingPost.length === 0
        return(
            <div>
              <div className="info-background">
                  
              </div>
              <div className="selection-content">
                  <Layout style={{ padding: '24px 0', background: '#fff' }}>
                      <Content style={{ padding: '0 24px', minHeight: 300, overflow: 'hidden' }}>
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
                                    <div dangerouslySetInnerHTML = {{ __html:this.props.readingPost[0].post_content_html }}></div>
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
        readingPost: posts.readingPost,
        isFetching: true
    }
}


export default connect(mapStateToProps)(readArticle)