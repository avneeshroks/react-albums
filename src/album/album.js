import React from 'react';
import API from '../api/api';
import _ from 'lodash';
import './album.css';
import ItemsCarousel from 'react-items-carousel';
import Photo from '../photo/photo';


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
        
        if(_.isEmpty(this.state.photos[this.state.photosToRender.length])) {
            this.setState({ activeItemIndex });
            return;
        }
        
        let photo = this.state.photos[this.state.photosToRender.length];
        photosToRender.push(
            <Photo key={'photo' + photo.id} {...photo}></Photo>
        );

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
            <div className="album-wrapper">
                <div className="album">
                    <div className="album-header">
                        <div>
                            <h3>
                                { this.props.title }
                            </h3>
                        </div>
                        <div>
                            <span> id : { this.props.id } </span>
                            <span> userId : { this.props.userId } </span>
                        </div>
                    </div>
                    <div className="album-photos">
                        {
                            !_.isEmpty(this.state.photosToRender) &&

                            <ItemsCarousel
                                // Placeholder configurations
                                enablePlaceholder
                                numberOfPlaceholderItems={5}
                                minimumPlaceholderTime={1000}
                                placeholderItem={<div style={{ height: '150', width:'150'}}>Placeholder</div>}
                        
                                // Carousel configurations
                                numberOfCards={5}
                                gutter={0}
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
                <Photo key={'photo' + photo.id} {...photo}></Photo>
            )
            return photo;
        })

        return photosToRender;
        
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
