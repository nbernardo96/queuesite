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
    List,
    Menu,
    Responsive,
    Segment,
    Sidebar,
    Visibility,
    Dropdown
} from "semantic-ui-react";

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

const HomepageLayout = () => (
    <ResponsiveContainer>
        <Segment style={{ padding: "8em 0em" }} vertical>
            <Grid container stackable verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={8} >
                        <Header as="h1"
                            style={
                                { fontSize: "2.5em" }} >
                            Sunshine Life & Health Advisors {" "}
                        </Header>{" "}
                        <p style={{ fontSize: "1.33em" }} > </p>{" "} <Header as="h3" style={{ fontSize: "1.50em" }} > We Make Personalized Business Cards and Flyers {" "}
                        </Header>{" "}
                        <p style={{ fontSize: "1.20em" }} > Choose and fill out an order form below {" "} </p>{" "}
                        <Dropdown placeholder='Select choice' scrolling options={options} />
                    </Grid.Column>{" "}
                    <Grid.Column floated="right" width={6}>
                        <Image
                            rounded
                            size="large"
                            src='./logo.png'
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign="center">
                        <Button size="huge">Check Them Out</Button>
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
            <Container text>
                <Header as="h3" style={{ fontSize: "2em" }}>
                    Breaking The Grid, Grabs Your Attention
        </Header>
                <p style={{ fontSize: "1.33em" }}>
                    Instead of focusing on content creation and hard work, we have learned
                    how to master the art of doing nothing by providing massive amounts of
                    whitespace and generic content that can seem massive, monolithic and
                    worth your attention.
        </p>
                <Button as="a" size="large">
                    Read More
        </Button>
                <Divider
                    as="h4"
                    className="header"
                    horizontal
                    style={{ margin: "3em 0em", textTransform: "uppercase" }}
                >
                    <a href="#">Case Studies</a>
                </Divider>
                <Header as="h3" style={{ fontSize: "2em" }}>
                    Did We Tell You About Our Bananas?
        </Header>
                <p style={{ fontSize: "1.33em" }}>
                    Yes I know you probably disregarded the earlier boasts as non-sequitur
                    filler content, but it's really true. It took years of gene splicing
                    and combinatory DNA research, but our bananas can really dance.
        </p>
                <Button as="a" size="large">
                    I'm Still Quite Interested
        </Button>
            </Container>
        </Segment>
    </ResponsiveContainer >
);
export default HomepageLayout;