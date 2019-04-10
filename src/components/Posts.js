import React from 'react'
import PropTypes from 'prop-types'
//import { AutoSizer } from 'react-virtualized/dist/commonjs/AutoSizer'
//import { List as VList } from 'react-virtualized/dist/commonjs/List'
//import { CellMeasurerCache, CellMeasurer } from 'react-virtualized/dist/commonjs/CellMeasurer'

const Posts = ({posts}) => (
  <div>9    {posts.map((post, i) =>
      <div key={i} dangerouslySetInnerHTML = {{ __html:post.post_content_html }}></div>
    )}
  </div>
  
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts