import {useState, useEffect} from 'react';
import axios from 'axios';

const channelNames = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

const request = async (route, name) => axios.get(`https://wind-bow.glitch.me/twitch-api/${route}/${name}`);

const mountChannelPromises = () => {
    const channelPromises =
        channelNames
            .map(channel => [request("channels", channel), request("streams", channel)])
            .reduce((acc, curr) => [...acc, ...curr], []);

    return channelPromises;

};
const findChannelRequests = (arrayToFind, endpoint, channelName) => {
    let result = arrayToFind.filter(channel => {
        return channel.config.url.includes(endpoint) && channel.config.url.includes(channelName);
    });

    return result[0].data;
};

const useStreamList = () => {

    const [channels, setChannels] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const channelPromises = mountChannelPromises();

        Promise.all(channelPromises).then(channelRequestsResult => {

            const channelObjects = channelNames.reduce((acc, curr) => {

                let channelInfoData = findChannelRequests(channelRequestsResult, "channels", curr);
                let streamInfoData = findChannelRequests(channelRequestsResult, "streams", curr);
                let statusFlag = streamInfoData.stream ? "online" : "offline";

                return {
                    ...acc,
                    [curr]: {
                        channelInfo: channelInfoData,
                        streamInfo: streamInfoData,
                        status: statusFlag
                    }
                }
            }, {});

            setChannels(channelObjects);
            setIsLoading(false);

        }).catch(error => {
            setError(`${error}`);
            console.log("entrei no catch");
            
            console.log(error)
        })
    }, []);

    return {
        channels,
        isLoading,
        error
    }
}

export default useStreamList;