import React,{Component} from 'react'
import './App.css';
import {YoutubeDataAPI} from 'youtube-v3-api'
import Header from './components/Header'
import VideoCards from './components/VideoCards'

class App extends Component{
  constructor(){
    super()
    this.state={
      API_KEY:'AIzaSyDx4hKw7GYUajee_cZzcpuId8V8FvnKizI',
      searchInput: "",
      loading:true,
      youData: {}
    }
  }

  componentDidMount(){
    // const api = new YoutubeDataAPI(this.state.API_KEY);
    // api.searchAll("news",25).then((data) => {
    //     this.setState({
    //       loading: false,
    //       youData:data
    //     });
    // },(err) => {
    //     console.error(err);
    // })
  }

  handleClick=()=>{
    // const api = new YoutubeDataAPI(this.state.API_KEY);
    // api.searchAll(this.state.searchInput,25).then((data) => {
    //     this.setState({
    //       youData:data
    //     });
    // },(err) => {
    //     console.error(err);
    // })
    // console.log(this.state.youData.items[2].id.videoId)
    // console.log(this.state.youData.items[2].snippet.title)
    // console.log(this.state.youData.items[2].snippet.thumbnails.default)
  }

  handleChangeInput=(e)=>{
    const {name,value} = e.target
    this.setState({
      [name]:value
    })
  }

  render(){
    const firstLook=
      this.state.loading ? 
      "loading..." : 
      this.state.youData.items.map((item,index) => (<li key={index}>{item.snippet.title}</li>))

    return (
      <div className="App">
        <Header
          handleChangeInput={this.handleChangeInput}
          handleClick={this.handleClick}
          {...this.state}
        />
        {firstLook }
        <main className="main__video__container">
          <VideoCards/>
          <VideoCards/>
          <VideoCards/>
          <VideoCards/>
          <VideoCards/>
        </main>
      </div>
    );
  }
}

export default App;
