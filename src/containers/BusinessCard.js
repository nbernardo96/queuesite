import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";

import {
    Button,
    Container,
    Grid,
    Header,
    Image,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Form,
    Message
} from "semantic-ui-react";

import business_card_1 from './images/business-card-img-1.png'
import business_card_2 from './images/business-card-img-2.png'

const initialState = {
    success: '',
    name: '',
    title: '',
    agent: '',
    fax: '',
    direct: '',
    office: '',
    email: '',
    address: '',
    nameError: false,
    titleError: false,
    directError: false,
    officeError: false,
    emailError: false,
    addressError: false
}

const getWidth = () => {
    const isSSR = typeof window === "undefined";
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class DesktopContainer extends Component {
    state = {};

    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });

    render() {
        const { children } = this.props;
        const { fixed } = this.state;

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                />
                {children}
            </Responsive>
        );
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node
};

class MobileContainer extends Component {
    state = {};

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened } = this.state;

        return (
            <Responsive
                as={Sidebar.Pushable}
                getWidth={getWidth}
                maxWidth={Responsive.onlyMobile.maxWidth}
            >
                {children}
            </Responsive>
        );
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
);

ResponsiveContainer.propTypes = {
    children: PropTypes.node
};

class BusinessCardPage extends Component {
    constructor(props) {
        super(props)

        this.state = initialState       // sets initial state of field values to empty, errors to false

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // validate function checks if all required input form fields are filled out correctly
    validate = () => {
        if (this.state.name === '' || this.state.title === '' || this.state.direct === '' || this.state.office === '' || this.state.address === '' || !this.state.email.includes('@')) {
            if (this.state.name === '') {
                this.setState({ nameError: true })
            } else {
                this.setState({ nameError: false })
            }
            if (this.state.title === '') {
                this.setState({ titleError: true })
            } else {
                this.setState({ titleError: false })
            }
            if (this.state.direct === '') {
                this.setState({ directError: true })
            } else {
                this.setState({ directError: false })
            }
            if (this.state.office === '') {
                this.setState({ officeError: true })
            } else {
                this.setState({ officeError: false })
            }
            if (!this.state.email.includes('@' && '.')) {
                this.setState({ emailError: true })
            } else {
                this.setState({ emailError: false })
            }
            if (this.state.address === '') {
                this.setState({ addressError: true })
            } else {
                this.setState({ addressError: false })
            }
            return false
        } else {
            return true
        }
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const queue = {
            name: this.state.name,
            title: this.state.title,
            fax: this.state.fax,                                   // data to be submitted to database
            direct: this.state.direct,
            office: this.state.office,
            email: this.state.email,
            address: this.state.address,
        };

        const isValid = this.validate();

        if (isValid) {                                             // if all input fields are filled out correctly on submit, reset values and clear form
            this.setState(initialState);                           // sets all input values back to empty string
            event.target.reset();                                  // clears form on UI
        }

        axios.post('http://127.0.0.1:8000/api/businesscardqueues/', queue)      // sends post request to database
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({
                    success: 'success'
                });
            })
            .catch(e => {
                console.log(e)
                this.setState({
                    success: 'error'
                });
            })
    }

    render() {
        return (
            < ResponsiveContainer>
                <Segment style={{ padding: "8em 0em 5em 0em" }} vertical>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8} textAlign="center">
                                <Header as="h1"
                                    style={{ fontSize: "2.5em" }} >
                                    Business Card Form {" "}
                                </Header>{" "}
                                <Image
                                    centered
                                    size="large"
                                    src={business_card_1}
                                />
                                <Image
                                    centered
                                    size="large"
                                    src={business_card_2}
                                />
                                <p style={{ fontSize: "1.33em" }} > </p>{" "}
                            </Grid.Column>{" "}
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: "5em 0em" }} vertical>

                    <Container>
                        <Form onSubmit={this.handleSubmit} success error>
                            {(() => {
                                if (this.state.success === 'success') {
                                    return (
                                        <Message
                                            success                                         // displays success message if form has been submitted successfully
                                            header='Form Submitted'
                                            content="Thank you for submitting a form"
                                        />
                                    )
                                } else if (this.state.success === 'error') {
                                    return (
                                        <Message
                                            error                                           // displays error message if form has NOT been submitted successfully
                                            header='Invalid Input'
                                            content='Please fill out the required fields below'
                                        />
                                    )
                                }
                            })()}
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Agent Name</label>
                                <Form.Input
                                    error={this.state.nameError}
                                    placeholder='Agent Name'
                                    name='name'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>
                                    <p style={{ padding: "0.5em 0em 0em 0em" }}>Title (Licensed Insurance Agent or Other)</p>
                                </label>
                                <Form.Input
                                    error={this.state.titleError}
                                    placeholder='Title'
                                    name='title'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Fax</label>
                                <Form.Input
                                    placeholder='Fax'
                                    name='fax'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Direct</label>
                                <Form.Input
                                    error={this.state.directError}
                                    placeholder='Direct'
                                    name='direct'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Office</label>
                                <Form.Input
                                    error={this.state.officeError}
                                    placeholder='Office'
                                    name='office'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Email</label>
                                <Form.Input
                                    error={this.state.emailError}
                                    placeholder='Email'
                                    name='email'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={{ fontSize: "20px" }}>Address</label>
                                <Form.Input
                                    error={this.state.addressError}
                                    placeholder='Address'
                                    name='address'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </Container>
                </Segment>
                <Segment style={{ padding: "8em 0em" }} vertical>
                    <Container text textAlign="center">
                        <Header as="h3" style={{ fontSize: "2em" }}>
                            Tony's Design Queue
            </Header>
                        <Header as="h4" style={{ fontSize: "2em" }}>
                            El queue de diseño para Tony
            </Header>
                        <p style={{ fontSize: "1.33em" }}>
                            Please, only use this when necessary.
                <p>Por favor, utiliza esto cuando sea necessario.</p>
                        </p>
                    </Container>
                </Segment>
            </ResponsiveContainer >
        );
    }
}

export default BusinessCardPage;

