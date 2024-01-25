

import {VideoPlayer}from "../components/"

const LiveScreen=({navigation})=>{
  const url ="https://webstreaming-2.viewmedia.tv/web_024/Stream/playlist.m3u8"
  return <VideoPlayer navigation={navigation} url={url}/>
  
  
}
export default LiveScreen







