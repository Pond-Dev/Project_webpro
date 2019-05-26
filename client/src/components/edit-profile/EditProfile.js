import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile,getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      firstname: '',
      lastname: '',
      gender: '',
      birthday: '',
      address: '',
      phonenumber: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
      this.props.getCurrentProfile() ;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // if profile field doesnot exist, make empty string
      profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : '' ;
      profile.birthday = !isEmpty(profile.birthday) ? profile.birthday : '';
      profile.phonenumber = !isEmpty(profile.phonenumber) ? profile.phonenumber : '';

      // Set component fields state 
      this.setState({
        firstname: profile.firstname,
        lastname: profile.lastname,
        gender: profile.gender,
        birthday: profile.birthday,
        address: profile.address,
        phonenumber: profile.phonenumber
      })
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      gender: this.state.gender,
      birthday: this.state.birthday,
      address: this.state.address,
      phonenumber: this.state.phonenumber
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for Gender
    const options = [
      { label: '* Gender', value: 0 },
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Firstname"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange}
                  error={errors.firstname}
                  info="A unique handle for your profile URL. Your full name, lastname name, nickname"
                />
                <TextFieldGroup
                  placeholder="lastname"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange}
                  error={errors.lastname}
                  info="Could be your own lastname or one you work for"
                />
                <SelectListGroup
                  placeholder="Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                  info="Could be your own gender or a lastname one"
                />
                <TextFieldGroup
                  placeholder="Birthday"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.onChange}
                  error={errors.birthday}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="phonenumber"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  onChange={this.onChange}
                  error={errors.phonenumber}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile,getCurrentProfile })(
  withRouter(CreateProfile)
);
