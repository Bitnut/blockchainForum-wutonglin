import React, {Component} from 'react'
import { Layout} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostById} from '../../redux/actions/posts'
//import Picker from '../../components/Picker'
import Posts from '../../components/Posts'
//import http from '../../services/server';
const { Content} = Layout;

class raedArticle extends Component{
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
        const { posts, isFetching, lastUpdated } = this.props
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
                        : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Posts posts={this.props.readingPost} />
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


export default connect(mapStateToProps)(raedArticle)