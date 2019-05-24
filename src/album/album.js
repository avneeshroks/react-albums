import React from 'react';
import API from '../api/api';
import _ from 'lodash';
import ItemsCarousel from 'react-items-carousel';


export class Album extends React.Component {

    state = {
        photos : {},
        activeItemIndex: 0
    };

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

    componentDidMount() {
        this.getPhotos(this.props.id);
    }

    render() {

        let photosToRender = this.getPhotosToRender(this.state.photos);

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
                        !_.isEmpty(photosToRender) &&

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
                    
                            chevronWidth={24}
                            rightChevron={'>'}
                            leftChevron={'<'}
                            outsideChevron={false}
                            width={'100%'}
                        >
                            {photosToRender}
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

        try {
            let res = await API.get(`/photos?albumId=${id}`);
            let data  = res.data;
            this.setState({ photos: data });
        } catch(error) {
            console.log(error);
        }

    }
}

export default Album;
