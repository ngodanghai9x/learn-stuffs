import React from 'react';
import data from './data.js';
import LazyLoad from 'react-lazyload';

// const LazyLoad = (props) => (
//   <div className="my-lazy">
//     {props.children}
//   </div>
// )

const Loading = () => (
  <div className="post loading">
    <h5>Loading...</h5>
  </div>
)

const Image = ({ id, size }) => (
  <div className="post-img" style={{ minWidth: 200 }}>
    <img
      src={`https://picsum.photos/id/${id}/${size}/${size}`} alt="...."
      // data-fr-src={`https://picsum.photos/id/${id}/${size}/${size}`}
      // loading="lazy"
      height={200} width={200}
    />
  </div>
);

const ImageNull = ({ id, size }) => (
  <div className="post-img" style={{ minWidth: 200, background: '#000', height: 200 }}>
    <img src="/logo512.png" height={200} width={200} />
  </div>
);

const Post = ({ id, title, body }) => (
  <div className="post" style={{
    background: '#fff',
    margin: 20,
    marginTop: 0,
    color: '#000',
    display: 'flex',
  }}>
    <LazyLoad
      once
      placeholder={<Image id={id+1} size={5} />}
    >
      <Image id={id} size={1500} />
    </LazyLoad>

    <div className="post-body">
      <h4>{title}</h4>
      <p>{body}</p>
    </div>
  </div>
)

const MyLazyLoad = () => {
  return (
    <div className="MyLazyLoad">
      <h2>LazyLoad Demo</h2>
      <div className="post-container">
        {data.map(post => (
          // <LazyLoad
          //   key={post.id}
          //   placeholder={<Loading />}
          //   height={100}
          //   offset={[-100, 100]}
          // >
            <Post key={post.id} {...post} />
          // </LazyLoad>
        ))}
      </div>
    </div>
  );
}

export default MyLazyLoad;