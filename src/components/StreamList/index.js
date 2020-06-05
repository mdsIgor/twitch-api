import React from 'react';
import useStreamList from './hooks';
import { useFilter } from '../../context/Filter';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import If from '../If';
import Spinner from '../Spinner';
import Modal from '../Modal';
import "./StreamList.scss";

const channelsBySelectedStatus = filter => channel => filter === 'all' ? channel : channel.status === filter;

const StreamList = () => {
    const { filter } = useFilter();
    const { channels, isLoading, error } = useStreamList();

    return (
        <main>
            <If
                condition={isLoading}

                renderIf={
                    error ? <Modal error={error} isOpen={true} /> : <Spinner />
                }

                renderElse={

                    <ul className="stream-list-container">
                        <TransitionGroup
                            component={null}
                        >
                            {
                                Object
                                    .values(channels)
                                    .filter(channelsBySelectedStatus(filter))
                                    .map(channel => {
                                        return (
                                            <CSSTransition
                                                key={channel.channelInfo._id}
                                                timeout={500}
                                                appear
                                                exit
                                                classNames="item"
                                            >
                                                <li className="stream-list__item">
                                                    <div className="img-wrapper" >
                                                        <img src={channel.channelInfo.logo} onError={(e) => {
                                                            e.target.onError=null
                                                            e.target.src = "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
                                                            }} className="stream-list__img" />
                                                    </div>
                                                    <a href={channel.channelInfo.url}>{channel.channelInfo.name}</a>
                                                    <span>{channel.streamInfo.stream ? channel.channelInfo.status : "offline"}</span>
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