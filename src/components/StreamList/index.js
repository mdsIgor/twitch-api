import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/Filter';
import If from '../If';
import Spinner from '../Spinner';
import axios from 'axios';
import "./StreamList.scss";


const StreamList = () => {
    const channelNames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    const [channels, setChannels] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { filter } = useFilter();

    const request = async (route, name) => {
        return axios.get(`https://wind-bow.glitch.me/twitch-api/${route}/${name}`);
    }
    
    const mountChannelPromises = () => {
        
        const channelPromises = 
            channelNames
                .map(channel => [request("channels", channel), request("streams", channel)])
                .reduce((acc, curr) => [...acc, ...curr],[]);

        return channelPromises;
        
    };

    const findChannelRequests = (arrayToFind, endpoint, channelName) => {
        let result = arrayToFind.filter(channel => {
            return channel.config.url.includes(endpoint) && channel.config.url.includes(channelName);
        });

        return result[0].data;
    };

    useEffect(()=>{

        const channelPromises = mountChannelPromises();

        Promise.all(channelPromises).then( channelRequestsResult => { 

           const channelObjects = channelNames.reduce( (acc, curr) => { 

            let channelInfoData = findChannelRequests(channelRequestsResult, "channels", curr);
            let streamInfoData = findChannelRequests(channelRequestsResult,"streams", curr);
            let statusFlag = streamInfoData.stream ? "online" : "offline";
        
                return {   
                            ...acc,
                            [curr] : {
                                channelInfo : channelInfoData ,
                                streamInfo : streamInfoData,
                                status: statusFlag
                            }
                }  
            }, {});

            setChannels(channelObjects);
            setIsLoading(false);
            
        }).catch(error => console.log(`Error in promises ${error}`))
    },[]);



    const channelsBySelectedStatus = (channel) => {
        return filter === 'all' ? channel : channel.status  === filter
    }

    return(
    
        <If 
            condition = {isLoading}

            renderIf = {
                <Spinner text="loading"/>
            }

            renderElse = {
                <main>
                    <ul className="stream-list-container">
                        {   Object
                                .values(channels)
                                .filter(channelsBySelectedStatus)
                                .map(channel => {
                                    return(
                                            <li key={channel.channelInfo._id} className="stream-list__item">
                                                <div className="stream-list__img" style={{backgroundImage:`url(${channel.channelInfo.logo})`}}/>
                                                <a href={channel.channelInfo.url}>{channel.channelInfo.name}</a>
                                                <span>{channel.streamInfo.stream ? channel.channelInfo.status : "offline" }</span>
                                            </li> 
                                    )
                                })
                        }
                    </ul>
                </main>
            }
        
        />
    )
}

export default StreamList;