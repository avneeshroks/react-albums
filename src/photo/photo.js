import React from 'react';
import './photo.css';

export class Photo extends React.Component {

    render() {
        return (
            <div className="photo">
                <div>
                    <img src={this.props.thumbnailUrl}  alt={this.props.title} />
                </div>
                <div>
                    <span><b> { this.getClippedTitle(this.props.title) } </b></span>
                </div>
                <div>
                    <h4 className="photo-id"> Id : {this.props.id} </h4>
                </div>
            </div>
        );
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
}

export default Photo;
