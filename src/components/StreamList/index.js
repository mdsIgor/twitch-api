import React, { useState, useEffect } from 'react';
import { useFilter } from '../../context/Filter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import If from '../If';
import Spinner from '../Spinner';
import Modal from '../Modal';
import axios from 'axios';
import "./StreamList.scss";


const StreamList = () => {
    const channelNames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    const [channels, setChannels] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
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
            
        }).catch(error => {
            setError(`${error}`);
            console.log( error)
        })
    },[]);



    const channelsBySelectedStatus = (channel) => {
        return filter === 'all' ? channel : channel.status  === filter
    }

    return(
        <main>
            <If 
                condition = {isLoading}

                renderIf = {
                    <Spinner/>
                }

                renderElse = {
                    <ul className="stream-list-container">
                    <Modal error={error} isOpen={error ? true : false}/>
                        <TransitionGroup 
                                component={null}
                        >
                            {   
                                Object
                                    .values(channels)
                                    .filter(channelsBySelectedStatus)
                                    .map(channel => {
                                        return(
                                            <CSSTransition
                                                key={channel.channelInfo._id}
                                                timeout={500}
                                                classNames="item"
                                            >
                                                <li className="stream-list__item">
                                                    <div className="stream-list__img" style={{backgroundImage:`url(${channel.channelInfo.logo})`}}/>
                                                    <a href={channel.channelInfo.url}>{channel.channelInfo.name}</a>
                                                    <span>{channel.streamInfo.stream ? channel.channelInfo.status : "offline" }</span>
                                                </li> 
                                            </CSSTransition>
                                        )
                                    })
                            }
                        </TransitionGroup>
                    </ul>
                
                }
            
            />
        </main>
    )
}

export default StreamList;