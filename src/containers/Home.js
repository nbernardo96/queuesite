import PropTypes from "prop-types";
import React, { Component } from "react";
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Icon,
    Image,
    Label,
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Dropdown,
    Modal
} from "semantic-ui-react";

import "./Login"
import { connect } from "react-redux";

import flyer from './images/flyer-img.png';
import business_card_1 from './images/business-card-img-1.png'
import business_card_2 from './images/business-card-img-2.png'

const options = [
    { key: 'business_card', text: 'Business Card', value: 1 },
    { key: 'flyer_poster', text: 'Flyer', value: 2 },
]

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

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.token !== null,
    };
};


class HomepageLayout extends Component {
    constructor() {
        super();
        this.state = {
            value: 1
        }
    }

    handleChange = (e, { value }) => this.setState({ value })
    reroute = (e) => {
        const { authenticated } = this.props;

        // checks if user is logged in when choosing a form, else redirects them to login page
        if (this.state.value === 1 && authenticated) {
            window.location.href = '/businesscard'
        } else if (this.state.value === 2 && authenticated) {
            window.location.href = '/flyer'
        } else {
            window.location.href = '/login'
        }
    }


    render = () => (
        < ResponsiveContainer >
            <Segment style={{ padding: "8em 0em" }} vertical>
                <Grid container stackable verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column width={8} textAlign="center">
                            <Header as="h1"
                                style={{ fontSize: "2.5em" }} >
                                Sunshine Life & Health Advisors {" "}
                            </Header>{" "}
                            <p style={{ fontSize: "1.33em" }} > </p>{" "} <Header as="h3" style={{ fontSize: "1.50em" }} > We Make Personalized Business Cards and Flyers {" "}
                            </Header>{" "}
                            <p style={{ fontSize: "1.20em" }} > Choose and fill out an order form below {" "} </p>{" "}

                        </Grid.Column>{" "}
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Modal trigger={<Button size="large">Fill Out Form</Button>} closeIcon>
                                <Modal.Header>
                                    Choose A Form
                            </Modal.Header>
                                <Modal.Content>
                                    <Dropdown
                                        placeholder='Select choice'
                                        fluid
                                        compact
                                        selection
                                        onChange={this.handleChange}
                                        options={options}
                                        value={this.state.value}
                                    />{"\n"}
                                </Modal.Content>
                                <Modal.Content>
                                    <Button onClick={this.reroute}>Select</Button>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{ padding: "0em" }} vertical>
                <Grid celled="internally" columns="equal" stackable>
                    <Grid.Row textAlign="center">
                        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                Flyers
                        </Header>
                            <Image
                                centered
                                rounded
                                size="medium"
                                src={flyer}
                            />
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
                            <Header as="h3" style={{ fontSize: "2em" }}>
                                Business Cards
                        </Header>
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
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
                </p>
                    <p>Por favor, utiliza esto cuando sea necessario.</p>
                </Container>
            </Segment>
        </ResponsiveContainer >
    );
}

export default connect(
    mapStateToProps
)(HomepageLayout);
