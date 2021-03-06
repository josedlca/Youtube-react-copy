import React,{useState, useEffect} from 'react'
import {YoutubeDataAPI} from 'youtube-v3-api'
import {videoDaysCounter, titleLimit} from './helpers'
import {Link} from 'react-router-dom'

const VideoCards=(props)=>{

    useEffect(() =>{
        getVideoInfo()
    })

    const [videoInfo, setVideoInfo] = useState([])
    const [fakeViews, setFakeViews] = useState(true)
    const [channelInfo, setChannelInfo] = useState([])
    const [fakeUrl, setFakeUrl] = useState(true)

    const getVideoInfo = ()=>{
        const api = new YoutubeDataAPI(process.env.REACT_APP_API_KEY);
        api.searchVideo(props.videoData.id.videoId).then((data) => {
            setVideoInfo(data)
            setFakeViews(false)
            if(props.youAre === "mainPage"){
                data.items.map( item => (getChannelInfo(item.snippet.channelId)))
            }
        },(err) => {
            console.log(err);
        })
    }

    const getChannelInfo = (channelId)=>{
        const api = new YoutubeDataAPI(process.env.REACT_APP_API_KEY);
        api.searchChannel(channelId, { 'id': channelId }).then((data) => {
            setChannelInfo(data)
            setFakeUrl(false)
        },(err) => {
            console.error(err);
        })
    }

    return(
        <Link 
            className="videoCard__container"
            style={
                props.youAre=="videoPlayer" ? 
                {width: '100%', flexDirection: 'row'}:
                {width: '20%', flexDirection: 'column'}
            }
            to={`/videoPlayer/${props.videoData.id.videoId}`}
        >
            <div 
                className="videoCard__container__thumbnail"
                style={
                    props.youAre=="videoPlayer"?
                    {width: '16.8rem', paddingTop: '9.4rem', marginRight: '0.8rem'}:
                    {paddingTop: '51%'}
                }
            >
                <img 
                    className="videoCard__container__thumbnail--img"
                    src={props.videoData.snippet.thumbnails.high.url}
                />
            </div>

            <div 
                className="videoCard__container__info"
                style={
                    props.youAre=="videoPlayer"?
                    {width: '60%'}:
                    {width: '100%'}
                }
            >

                <div 
                    className="videoCard__container__info__miniature"
                    style={
                        props.youAre=="videoPlayer"?
                        {display:'none'}:
                        {display: 'inline-flex'}
                    }
                >
                    <div className="videoCard__container__info__miniature--img">
                        {
                            fakeUrl?
                            <img src="/img/miniPicture.jpg"/>:
                            <img src={channelInfo.items.map(item => (item.snippet.thumbnails.high.url) )}/>
                        }                        
                    </div>
                </div>

                <div className="videoCard__container__info__text">

                    <div 
                        className="videoCard__container__info__text--tittle"
                        style = {
                            props.youAre == "videoPlayer"?
                            {margin: '0 0 0.4rem 0'}:
                            {margin: '1.2rem 0 0.4rem 0'}
                        }
                    >
                        <h3 dangerouslySetInnerHTML={{__html:titleLimit(props.videoData.snippet.title, props.youAre)}}></h3>
                    </div>

                    <div className="videoCard__container__info__text--relative">

                        <div className="videoCard__container__info__text--relative_channelName">
                            {props.videoData.snippet.channelTitle}
                        </div>

                        <div className="videoCard__container__info__text--relative_viewsAndtime">
                            {
                                fakeViews?
                                <span>0000.000 vistas</span>:
                                <span>{videoInfo.items.map((item) => (`${item.statistics.viewCount} vistas`))}</span>
                            }                            
                            <span>{videoDaysCounter(props.videoData.snippet.publishedAt)}</span>
                        </div>

                    </div>

                </div>
            </div>
        </Link>
    )
}

export default VideoCards