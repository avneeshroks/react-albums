import React from 'react';
import API from '../api/api';
import LazyLoad from 'react-lazyload';
import Album from '../album/album';

export class AlbumList extends React.Component {

    state = {
        albums : []
    };

    componentDidMount() {
        this.getAlbums();
    }

    render() {
        let albumsToRender = this.renderAlbums(this.state.albums);

        return (
            <div>
                { albumsToRender }
            </div>
        );
    }

    renderAlbums(albums) {

        let albumsToRender = [];

        if(!albums) {
            return null;
        }

        albums.map((album) => {
            let albumProps = this.getAlbumProps(album);

            albumsToRender.push(
                <LazyLoad key={ 'album' +  album.id } height={200} offset={2}>
                    <Album {...albumProps}></Album>
                </LazyLoad>
            );

            return album;
        });

        return albumsToRender;
    }

    getAlbumProps(album) {
        return {
            title : album.title,
            id : album.id,
            userId : album.userId
        }
    }

    async getAlbums() {
        try {
            let res = await API.get(`albums/`);
            let data  = res.data;
            this.setState({ albums: data });
        } catch(error) {
            console.log(error);
        }
    }
}

export default AlbumList;
