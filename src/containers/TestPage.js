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
    Checkbox,
    Message
} from "semantic-ui-react";

import flyer from './images/flyer-img.png';


const initialState = {
    success: '',
    name: '',
    phone: '',
    payable_check: '',
    isChecked: false,
    nameError: false,
    phoneError: false,
    checkError: false,
    queues: []
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

class TestPage extends Component {
    constructor(props) {
        super(props)

        this.state = initialState       // set initial state of field values to empty, errors to false

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/flyerqueues/');
            const queues = await res.json();
            this.setState({
                queues
            });
        } catch (e) {
            console.log(e);
        }
    }


    // validate function checks if all required input form fields are filled out correctly
    validate = () => {
        if (this.state.name === '' || this.state.phone === '') {
            if (this.state.name === '') {
                this.setState({ nameError: true })
            }
            if (this.state.phone === '') {
                this.setState({ phoneError: true })
            }
            return false
        } else {
            return true
        }
    };

    handleCheck = () => {
        if (this.state.isChecked == true) {
            this.setState({ payable_check: 'YES' })
            return true
        } else if (this.state.isChecked == false) {
            this.setState({ payable_check: 'NO' })
            return false
        }
    }

    handleChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [e.target.name]: e.target.value,
            // isChecked: !this.state.isChecked
        });
        this.handleCheck();
    };

    handleSubmit = event => {
        event.preventDefault();

        const queue = {
            name: this.state.name,
            phone: this.state.phone,                                // data to be submitted to database
            payable_check: this.state.payable_check,
        };

        const isValid = this.validate();

        if (isValid) {                                             // if all input fields are filled out correctly on submit, reset values and clear form
            this.setState(initialState);                           // sets all input values back to empty string
            event.target.reset();                                  // clears form on UI
        }

        // console.log('QUEUE: ' + this.state.name + ' ' + this.state.phone + ' ' + this.state.payable_check)
        console.log('Payable check: ' + this.state.payable_check)

        // axios.post('http://127.0.0.1:8000/api/flyerqueues/', queue)      // sends post request to database
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         this.setState({
        //             success: 'success'
        //         });
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         this.setState({
        //             success: 'error'
        //         });
        //     })
    }

    render() {
        return (
            < ResponsiveContainer >
                <Segment style={{ padding: "8em 0em 5em 0em" }} vertical>
                    <Grid container stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8} textAlign="center">
                                <Header as="h1"
                                    style={{ fontSize: "2.5em" }} >
                                    Flyer Form {" "}
                                </Header>{" "}
                                <Image
                                    centered
                                    rounded
                                    size="medium"
                                    src={flyer}
                                />
                                <p style={{ fontSize: "1.33em" }} > </p>{" "}
                                <div>
                                    {this.state.queues.map(item => (
                                        <div key={item.id}>
                                            <h1>{item.name}</h1>
                                            <p>{item.phone}</p> {''}
                                            <p>{item.payable_check}</p>
                                        </div>
                                    ))}
                                </div>

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
                                <label style={{ fontSize: "20px" }}>Phone</label>
                                <Form.Input
                                    error={this.state.phoneError}
                                    placeholder='Phone Number'
                                    name='phone'
                                    onChange={e => this.handleChange(e)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    style={{ fontSize: "20px" }}
                                    label='Make check payable to: SLHA'
                                    name='payable_check'
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

export default TestPage;

