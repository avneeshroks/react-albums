import React from 'react';
import API from '../api/api';
import _ from 'lodash';
import ItemsCarousel from 'react-items-carousel';


export class Album extends React.Component {

    constructor() {
        super();
        this.state = {
            photos : [],
            activeItemIndex: 0,
            photosToRender : []
        };
    }

    changeActiveItem = (activeItemIndex) =>  {

        let photosToRender = this.state.photosToRender;
        let photo = this.state.photos[this.state.photosToRender.length];
        photosToRender.push(
            <div key={'photo' + photo.id} style={{ height: '150', width: '150'}}>
                <div>
                    <img src={photo.thumbnailUrl}  alt={photo.title} />
                </div>
                <div>
                    <span> { this.getClippedTitle(photo.title) } </span>
                </div>
                <div>
                    <span> Id : {photo.id} </span>
                </div>
            </div>
        )
        this.setState({ activeItemIndex, photosToRender}); 
    };

    componentDidMount() {
        if (_.isEmpty(this.state.photos)) {
            this.getPhotos(this.props.id)
            .then(photos => {
                let photosToRender = this.getPhotosToRender(photos);
                this.setState({
                    photos : photos,
                    photosToRender : photosToRender.slice(0,8)
                })
            })
            .catch(err => { /*...handle the error...*/});   
        }
    }

    render() {
        return (
            <div className="">
                <div>
                    <div>
                        { this.props.title }
                    </div>
                    <div>
                        <span> { this.props.id } </span>
                        <span> { this.props.userId } </span>
                    </div>
                </div>
                <div>
                    {
                        !_.isEmpty(this.state.photosToRender) &&

                        <ItemsCarousel
                            // Placeholder configurations
                            enablePlaceholder
                            numberOfPlaceholderItems={5}
                            minimumPlaceholderTime={1000}
                            placeholderItem={<div style={{ height: '150', width:'150'}}>Placeholder</div>}
                    
                            // Carousel configurations
                            numberOfCards={7}
                            gutter={12}
                            showSlither={true}
                            firstAndLastGutter={true}
                            freeScrolling={false}
                    
                            // Active item configurations
                            requestToChangeActive={this.changeActiveItem}
                            activeItemIndex={this.state.activeItemIndex}
                            activePosition={'center'}
                    
                            chevronWidth={50}
                            rightChevron={'>'}
                            leftChevron={'<'}
                            outsideChevron={false}
                            width={'100%'}
                        >
                            {this.state.photosToRender}
                        </ItemsCarousel>
                    }
                </div>
            </div>
        );
    }

    getPhotosToRender(photos) {
        if(_.isEmpty(photos)) {
            return [];
        }

        let photosToRender = [];

        photos.map((photo) => {
            photosToRender.push(
                <div key={'photo' + photo.id} style={{ height: '150', width: '150'}}>
                    <div>
                        <img src={photo.thumbnailUrl}  alt={photo.title} />
                    </div>
                    <div>
                        <span> { this.getClippedTitle(photo.title) } </span>
                    </div>
                    <div>
                        <span> Id : {photo.id} </span>
                    </div>
                </div>
            )
            return photo;
        })

        return photosToRender;
        
    }

    getClippedTitle(title) {
        if(!title) {
            return '';
        }

        let clipLength = 19;

        if(title.length > clipLength) {
            title = title.substring(0, clipLength);
        }

        title = title + '...';

        return title;
    }

    async getPhotos(id) {
        
        if (!id) {
            return;
        }

        let res = await API.get(`/photos?albumId=${id}`);
        return res.data;
    }
}

export default Album;
