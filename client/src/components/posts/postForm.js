import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextFieldAreaGroups from '../common/TextFieldAreaGroups'
import TextFieldGroup from '../common/TextFieldGroup'
import { addPost } from '../../actions/postActions'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            image: '',
            comment: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }



    onSubmit(e) {
        e.preventDefault();

        const { user } = this.props.auth;

        const newPost = {
            title: this.state.title,
            image: this.state.image,
            comment: this.state.comment,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addPost(newPost);
        this.setState({ title: '' });
    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {

        const { errors } = this.state
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Say Somthing...</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextFieldGroup
                                    placeholder="Topic"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    error={errors.title}
                                />
                                <TextFieldGroup
                                    placeholder="Input the URL image"
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.onChange}
                                    error={errors.image}
                                />
                                <TextFieldAreaGroups
                                    placeholder="Description"
                                    name="comment"
                                    value={this.state.comment}
                                    onChange={this.onChange}
                                    error={errors.comment}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);