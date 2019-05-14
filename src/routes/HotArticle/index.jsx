import React, {Component} from 'react'
import { Layout} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../../redux/actions/posts'
//import Picker from '../../components/Picker'
import Posts from '../../components/Posts'
import './index.css';
//import http from '../../services/server';
const { Content} = Layout;

class hotArticle extends Component{
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
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    componentDidUpdate(prevProps) {
    if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
        const { dispatch, selectedSubreddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
    }

    handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    }

    handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }

    render(){
        const { posts, isFetching, lastUpdated } = this.props
        const isEmpty = posts.length === 0
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
                        {!isFetching &&
                            <button onClick={this.handleRefreshClick}>
                            Refresh
                            </button>
                        }
                        </p>
                        {isEmpty
                        ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                        : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Posts posts={posts} />
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
    const { selectedSubreddit, postsBySubreddit } = state 
    const {
      isFetching,
      lastUpdated,
      items: posts
    } = postsBySubreddit[selectedSubreddit] || {
      isFetching: true,
      items: []
    }
  
    return {
      selectedSubreddit,
      posts,
      isFetching,
      lastUpdated
    }
}


export default connect(mapStateToProps)(hotArticle)