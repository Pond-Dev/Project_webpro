import React, { Component } from 'react'
import Moment from 'react-moment'

class ProfileCreds extends Component {
    render() {

        const { experience } = this.props;

        const expItems = experience.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4>{exp.title}</h4>
                <p>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (' Now') : (
                        < Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
                </p>
                <p><strong>Location: </strong>{exp.location}</p>
            </li >
        ))
        return (
            <div className="row">
                <div className="col-md-12"><br />
                    <h3 id="experience" className="text-center">Experience</h3>
                    {expItems.length > 0 ? (
                        <ul className="list-group">{expItems}</ul>
                    ) : (
                            <p id="experience" className="text-center">No Experience Listed</p>
                        )}
                </div><br /><br />
            </div>
        );
    }
}
export default ProfileCreds;